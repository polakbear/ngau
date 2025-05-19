import { useState, useEffect, useRef, useCallback } from 'react';
import { detectDeviceType } from '../utils/device';
import { GeoJsonFeature, TooltipState, CountryData } from '../types';
import { normalize } from '../utils/utils';

export function useDeviceHover() {
  const [hoverD, setHoverD] = useState<GeoJsonFeature | null>(null);
  const [tooltip, setTooltip] = useState<TooltipState>(null);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const isDesktop = detectDeviceType() === 'desktop';

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
      const newIso = polygon?.properties?.ISO_A3;
      const prevIso = hoverD?.properties?.ISO_A3;

      if (newIso !== prevIso) {
        if (polygon) {
          const countryName = polygon.properties.ADMIN || 'Unknown';
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
          setHoverD(polygon);
        } else {
          setTooltip(null);
          setHoverD(null);
        }
      }
    },
    [hoverD, isDesktop]
  );

  return {
    hoverD,
    tooltip,
    handleHover,
    isDesktop,
  };
}
