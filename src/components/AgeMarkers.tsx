import { CountryData, GeoJsonFeature } from '../types';
import { normalize } from '../utils/utils';

const getMarkerColor = (age: number | null) => {
  if (!age) return '#666666';
  if (age < 12) return '#ff4757';
  if (age < 15) return '#ff9f43';
  return '#3fd1c7';
};

interface MarkerData {
  lat: number;
  lng: number;
  color: string;
  country: string;
  age: number;
}

interface AgeMarkersProps {
  data: CountryData[];
  geoJson: { features: GeoJsonFeature[] & { __centroid?: [number, number] } };
}

export function getMarkerData(
  data: CountryData[],
  geoJson: AgeMarkersProps['geoJson']
): MarkerData[] {
  const markers: MarkerData[] = [];

  data.forEach((country) => {
    if (!country.criminal_minimum_age) return;

    const feature = geoJson.features.find(
      (f) => normalize(f.properties.ADMIN) === normalize(country.country)
    );

    if (!feature?.__centroid) return;

    // IMPORTANT: geoCentroid returns [longitude, latitude]
    const [longitude, latitude] = feature.__centroid;

    markers.push({
      lat: latitude, // latitude must be first for globe.gl
      lng: longitude, // longitude second
      color: getMarkerColor(country.criminal_minimum_age),
      country: country.country,
      age: country.criminal_minimum_age,
    });
  });

  //   console.log(
  //     'Created markers with coordinates:',
  //     markers.map((m) => `${m.country}: [${m.lat}, ${m.lng}]`)
  //   );

  return markers;
}
