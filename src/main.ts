import { loadData } from './data-service';
import { createGlobe } from './globe-renderer';
import { CountryData } from './types';
import { inject } from '@vercel/analytics';
import { getElementById, setupSearchInput } from './utils/dom';

let data: CountryData[] = [];

async function initialize() {
  try {
    const { data: loadedData, geoJson } = await loadData();
    data = loadedData;

    const tooltip = getElementById<HTMLDivElement>('tooltip');
    const infoPanel = getElementById<HTMLDivElement>('info-panel');
    const input = getElementById<HTMLInputElement>('country-search');

    const world = createGlobe(geoJson, data, tooltip, infoPanel);

    setupSearchInput(input, geoJson, world);
  } catch (error) {
    console.error('Error initializing the application:', error);
  }
}

initialize();
inject();
