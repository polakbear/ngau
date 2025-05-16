import { loadData } from './data-service';
import { createGlobe } from './globe-renderer';
import { CountryData } from './types';
import { inject } from '@vercel/analytics';
import { getElementById } from './utils/dom';
import { createLegend } from './legend';
import { createScoreTabs } from './score-tabs';
import { createOrganizationsPanel, createTakeActionTab } from './organizations';
import { onScoreChange, setScoreType } from './score-state';
import { createPolygonMaterial } from './utils/poly';

let data: CountryData[] = [];
let geoJson: any;
let world: any;

function applyPolygonColors() {
  world.polygonCapMaterial((d: any) => createPolygonMaterial(d, data, null, 0));

  const features = world.polygonsData();
  world.polygonsTransitionDuration(0);
  requestAnimationFrame(() => {
    world.polygonsData(features);
    world.polygonsTransitionDuration(300);
  });
}

async function initialize() {
  try {
    const app = document.getElementById('app');
    if (!app) throw new Error('App container not found');

    app.prepend(createLegend());
    document.body.appendChild(createScoreTabs());
    document.body.appendChild(createTakeActionTab());
    document.body.appendChild(createOrganizationsPanel());

    const tooltip = getElementById<HTMLDivElement>('tooltip');
    const infoPanel = getElementById<HTMLDivElement>('info-panel');
    const toggle = getElementById<HTMLDivElement>('toggle-methodology');
    const methodologyPanel =
      getElementById<HTMLDivElement>('methodology-panel');
    const takeActionTab = getElementById<HTMLButtonElement>('take-action-tab');
    const organizationsPanel = getElementById<HTMLDivElement>(
      'organizations-panel'
    );

    toggle.addEventListener('click', () => {
      methodologyPanel?.classList.toggle('active');
      if (organizationsPanel?.classList.contains('active')) {
        organizationsPanel.classList.remove('active');
        takeActionTab?.classList.remove('active');
      }
    });

    takeActionTab.addEventListener('click', () => {
      takeActionTab.classList.toggle('active');
      organizationsPanel?.classList.toggle('active');
      if (methodologyPanel?.classList.contains('active')) {
        methodologyPanel.classList.remove('active');
      }
    });

    document.querySelectorAll('.score-tab').forEach((tab) => {
      tab.addEventListener('click', () => {
        const score = (tab as HTMLElement).dataset.score as keyof CountryData;
        if (!score) return;

        document
          .querySelectorAll('.score-tab')
          .forEach((el) => el.classList.remove('active'));
        tab.classList.add('active');

        // Then update the data and globe
        setScoreType(score);
        setTimeout(() => applyPolygonColors(), 0); // Force into next event loop tick

        document
          .querySelectorAll('.methodology-section')
          .forEach((el) => el.classList.remove('highlighted'));

        const sectionName = score.toLowerCase().replace('ranking_', '');
        const section = document.querySelector(`.methodology-${sectionName}`);
        section?.classList.add('highlighted');
      });
    });

    const result = await loadData();
    data = result.data;
    geoJson = result.geoJson;

    world = createGlobe(geoJson, data, tooltip, infoPanel);

    world.onGlobeLoaded(() => {
      geoJson.features.forEach((f: any) => {
        if (f.geometry && f.geometry.coordinates) {
          const coords = f.geometry.coordinates[0][0];
          let sumLng = 0,
            sumLat = 0;
          coords.forEach((coord: number[]) => {
            sumLng += coord[0];
            sumLat += coord[1];
          });
          f.__centroid = [sumLng / coords.length, sumLat / coords.length];
        }
      });

      applyPolygonColors();
      onScoreChange(applyPolygonColors);
    });
  } catch (error) {
    console.error('Error initializing the application:', error);
  }
}

initialize();
inject();
