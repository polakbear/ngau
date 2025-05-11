// main.ts
import { loadData } from './data-service';
import { createGlobe } from './globe-renderer';
import { CountryData } from './types';
import { inject } from '@vercel/analytics';
import { getElementById, setupSearchInput } from './utils/dom';
import { createLegend } from './legend';
import { onScoreChange, setScoreType, getScoreType } from './score-state';
import { normalize } from './utils/utils';
import { getColor } from './utils/color';

let data: CountryData[] = [];
let geoJson: any;
let world: any;

function applyPolygonColors() {
  world.polygonCapColor((feat: any) => {
    const countryName = feat.properties?.ADMIN;
    const country = data.find(
      (d) => normalize(d.country) === normalize(countryName)
    );
    if (!country) return 'gray';

    const rawScore = country[getScoreType()];
    const score = typeof rawScore === 'number' ? rawScore : undefined;

    return getColor(score);
  });

  world.polygonCapMaterial(world.polygonCapMaterial());
  world.polygonsData([]);
  world.polygonsData([...geoJson.features]);
  world.re;
}

async function initialize() {
  try {
    const app = document.getElementById('app');
    if (!app) throw new Error('App container not found');
    app.prepend(createLegend());

    const tooltip = getElementById<HTMLDivElement>('tooltip');
    const infoPanel = getElementById<HTMLDivElement>('info-panel');
    const input = getElementById<HTMLInputElement>('country-search');
    const toggle = getElementById<HTMLDivElement>('toggle-methodology');
    const panel = getElementById<HTMLDivElement>('methodology-panel');

    toggle.addEventListener('click', () => {
      panel?.classList.toggle('active');
    });

    document.querySelectorAll('.score-tab').forEach((tab) => {
      tab.addEventListener('click', () => {
        const score = (tab as HTMLElement).dataset.score as keyof CountryData;
        if (!score) return;

        setScoreType(score);

        document
          .querySelectorAll('.score-tab')
          .forEach((el) => el.classList.remove('active'));
        tab.classList.add('active');

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
      // Apply the color changes once the globe is loaded
      applyPolygonColors();
    });

    applyPolygonColors();
    onScoreChange(applyPolygonColors);

    setupSearchInput(input, geoJson, world);
  } catch (error) {
    console.error('Error initializing the application:', error);
  }
}

initialize();
inject();
