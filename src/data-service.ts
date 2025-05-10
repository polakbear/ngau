import { CountryData } from "./types";

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
  return { data, geoJson };
}
