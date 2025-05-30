import React, {
  createContext,
  useContext,
  useMemo,
  useEffect,
  useState,
} from 'react';
import { geoCentroid } from 'd3-geo';
import type { CountryData } from '../types';

interface GeoDataContextValue {
  geoJson: any;
  data: CountryData[];
}

const GeoDataContext = createContext<GeoDataContextValue | undefined>(
  undefined
);

export const GeoDataProvider: React.FC<{ children: React.ReactNode }> = ({
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

export function useGeoDataContext(): GeoDataContextValue {
  const context = useContext(GeoDataContext);
  if (!context) {
    throw new Error('useGeoDataContext must be used within a GeoDataProvider');
  }
  return context;
}
