import { useState, useEffect } from 'react';
import { CountryData } from '../types';
import { geoCentroid } from 'd3-geo';

export function useGeoData(onDataLoaded?: (geoJson: any) => void) {
  const [geoJson, setGeoJson] = useState<any>(null);
  const [data, setData] = useState<CountryData[]>([]);

  useEffect(() => {
    let isMounted = true;
    fetch('/countries.geojson')
      .then((res) => res.json())
      .then((geo) => {
        geo.features.forEach((f: any) => {
          f.__centroid = geoCentroid(f);
        });
        if (isMounted) {
          setGeoJson(geo);
          if (onDataLoaded) onDataLoaded(geo);
        }
      });
    fetch('/data.json')
      .then((res) => res.json())
      .then((d) => {
        if (isMounted) setData(d);
      });
    return () => {
      isMounted = false;
    };
  }, [onDataLoaded]);

  return { geoJson, data };
}
