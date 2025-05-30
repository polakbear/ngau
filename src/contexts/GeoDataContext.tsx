import { createContext } from 'react';
import type { CountryData } from '../types';

export interface GeoDataContextValue {
  geoJson: any;
  data: CountryData[];
}

const GeoDataContext = createContext<GeoDataContextValue | undefined>(
  undefined
);

export default GeoDataContext;
