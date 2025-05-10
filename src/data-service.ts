import { CountryData } from "./types";
import * as d3 from 'd3-geo';

export async function fetchData(url: string): Promise<any> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch data from ${url}`);
  }
  return response.json();
}

export async function loadData(): Promise<{
  data: CountryData[];
  geoJson: any;
}> {
  const data = await fetchData("/data.json");
  const geoJson = await fetchData("/countries.geojson");
  geoJson.features.forEach((f: any) => {
    f.__centroid = d3.geoCentroid(f);
  });
  return { data, geoJson };
}
