import { useState, useEffect, useRef, useCallback } from 'react';
import { GeoJsonFeature, TooltipState, CountryData } from '../types';
import { normalize } from '../utils/utils';
import { useDeviceType } from './useDeviceType';

/**
 * Combines polygon hover logic (tooltip, hover state, mouse tracking) into a single hook.
 * Returns: { hoverD, tooltip, handleHover, isDesktop }
 */
export function usePolygonHover() {
  const [hoverD, setHoverD] = useState<GeoJsonFeature | null>(null);
  const [tooltip, setTooltip] = useState<TooltipState>(null);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const deviceType = useDeviceType();
  const isDesktop = deviceType === 'desktop';

  useEffect(() => {
    if (!isDesktop) return;
    const trackMousePosition = (e: MouseEvent) => {
      mousePositionRef.current = { x: e.pageX, y: e.pageY };
    };
    window.addEventListener('mousemove', trackMousePosition);
    return () => window.removeEventListener('mousemove', trackMousePosition);
  }, [isDesktop]);

  const handleHover = useCallback(
    (polygon: any, data: CountryData[]) => {
      if (polygon) {
        const feature = polygon as GeoJsonFeature;
        const countryName = feature.properties.ADMIN || 'Unknown';
        const country = data.find(
          (d) => normalize(d.country) === normalize(countryName)
        );
        if (isDesktop) {
          setTooltip({
            x: mousePositionRef.current.x,
            y: mousePositionRef.current.y,
            countryName,
            country,
          });
        }
        setHoverD(feature);
      } else {
        setTooltip(null);
        setHoverD(null);
      }
    },
    [isDesktop]
  );

  return {
    hoverD,
    tooltip,
    handleHover,
    isDesktop,
  };
}
