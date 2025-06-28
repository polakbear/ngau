import { useState, useEffect, useRef, useCallback } from 'react';
import { GeoJsonFeature, TooltipState, CountryData } from '../types';
import { normalize } from '../utils/utils';
import { useDeviceType } from './useDeviceType';

/**
 * Combines polygon hover logic (tooltip, hover state, mouse tracking) into a single hook.
 */
export function usePolygonHover(disableHover: boolean = false) {
  const [hoveredFeature, setHoveredFeature] = useState<GeoJsonFeature | null>(
    null
  );
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
      // Don't handle hover events if disabled (e.g., when InfoPanel is open)
      if (disableHover) {
        setTooltip(null);
        setHoveredFeature(null);
        return;
      }

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
        setHoveredFeature(feature);
      } else {
        setTooltip(null);
        setHoveredFeature(null);
      }
    },
    [isDesktop, disableHover]
  );

  return {
    hoveredFeature,
    tooltip,
    handleHover,
    setTooltip,
    isDesktop,
  };
}
