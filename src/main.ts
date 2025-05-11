import { loadData } from './data-service';
import { createGlobe } from './globe-renderer';
import { CountryData } from './types';
import { inject } from '@vercel/analytics';
import { getElementById } from './utils/dom';
import { createLegend } from './legend';
import { createScoreTabs } from './score-tabs';
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

    const tooltip = getElementById<HTMLDivElement>('tooltip');
    const infoPanel = getElementById<HTMLDivElement>('info-panel');
    const toggle = getElementById<HTMLDivElement>('toggle-methodology');
    const panel = getElementById<HTMLDivElement>('methodology-panel');

    toggle.addEventListener('click', () => {
      panel?.classList.toggle('active');
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

        const section = document.querySelector(
          `.methodology-${score.toLowerCase()}`
        );
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
