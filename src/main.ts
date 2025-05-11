import { loadData } from './data-service';
import { createGlobe } from './globe-renderer';
import { CountryData } from './types';
import { inject } from '@vercel/analytics';

let data: CountryData[] = [];

async function initialize() {
  try {
    const { data: loadedData, geoJson } = await loadData();
    data = loadedData;

    const tooltip = document.getElementById('tooltip');
    if (!tooltip) {
      throw new Error('Element with id "tooltip" not found');
    }
    const infoPanel = document.getElementById('info-panel');
    if (!infoPanel) {
      throw new Error('Element with id "tooltip" not found');
    }
    const world = createGlobe(geoJson, data, tooltip, infoPanel);
    const input = document.getElementById('country-search') as HTMLInputElement;
    if (!input) {
      throw new Error('Element with id "country-search" not found');
    }
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const search = input.value.trim().toLowerCase();
        const match = geoJson.features.find(
          (f: { properties: { ADMIN: string } }) =>
            f.properties.ADMIN.toLowerCase().includes(search)
        );

        if (match && match.__centroid) {
          const [lng, lat] = match.__centroid;
          world.pointOfView({ lat, lng, altitude: 1.0 }, 1000);
          input.value = '';
        } else {
          console.log('Country not found');
        }
      }
    });
  } catch (error) {
    console.error('Error initializing the application:', error);
  }
}

initialize();
inject();
