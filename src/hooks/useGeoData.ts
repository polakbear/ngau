import { useContext } from 'react';
import GeoDataContext, {
  GeoDataContextValue,
} from '../contexts/GeoDataContext';

export function useGeoData(): GeoDataContextValue {
  const context = useContext(GeoDataContext);
  if (!context) {
    throw new Error('useGeoData must be used within a GeoDataProvider');
  }
  return context;
}
