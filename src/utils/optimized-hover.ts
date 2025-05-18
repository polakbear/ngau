import { MutableRefObject } from 'react';
import { CountryData, GeoJsonFeature, TooltipSetter } from '../types';
import { normalize } from './utils';

interface OptimizedHoverConfig {
  setTooltip: TooltipSetter;
  setHoverD: (d: GeoJsonFeature | null) => void;
  data: CountryData[];
  mousePositionRef: MutableRefObject<{ x: number; y: number }>;
}

export function createOptimizedPolygonHover({
  setTooltip,
  setHoverD,
  data,
  mousePositionRef,
}: OptimizedHoverConfig) {
  return (polygon: object | null) => {
    if (polygon) {
      const feature = polygon as GeoJsonFeature;
      const countryName = feature.properties.ADMIN || 'Unknown';
      const country = data.find(
        (d) => normalize(d.country) === normalize(countryName)
      );

      setTooltip({
        x: mousePositionRef.current.x,
        y: mousePositionRef.current.y,
        countryName,
        country,
      });

      setHoverD(feature);
    } else {
      setTooltip(null);
      setHoverD(null);
    }
  };
}
