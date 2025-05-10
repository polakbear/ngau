import { loadData } from "./data-service";
import { createGlobe } from "./globe-renderer";
import { CountryData } from "./types";

let data: CountryData[] = [];

async function initialize() {
  try {
    const { data: loadedData, geoJson } = await loadData();
    data = loadedData;

    const tooltip = document.getElementById("tooltip");
    if (!tooltip) {
      throw new Error('Element with id "tooltip" not found');
    }
    createGlobe(geoJson, data, tooltip);
  } catch (error) {
    console.error("Error initializing the application:", error);
  }
}

initialize();
