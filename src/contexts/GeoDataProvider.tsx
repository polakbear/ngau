import React, { useMemo, useEffect, useState } from 'react';
import { geoCentroid } from 'd3-geo';
import type { CountryData } from '../types';
import GeoDataContext from './GeoDataContext';

interface GeoDataProviderProps {
  children: React.ReactNode;
}

export const GeoDataProvider: React.FC<GeoDataProviderProps> = ({
  children,
}) => {
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
  }, []);

  const value = useMemo(() => ({ geoJson, data }), [geoJson, data]);

  return (
    <GeoDataContext.Provider value={value}>{children}</GeoDataContext.Provider>
  );
};
