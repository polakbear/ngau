import { useState, useCallback } from 'react';
import { GeoJsonFeature } from '../types';
import { useDeviceType } from './useDeviceType';

export function useCountryFocus() {
  const [focusedCountry, setFocusedCountry] = useState<string | null>(null);
  const [fadeProgress, setFadeProgress] = useState<number>(0);
  const deviceType = useDeviceType();

  const focusCountry = useCallback(
    (feature: GeoJsonFeature, globeRef: any) => {
      if (globeRef && feature.properties) {
        const countryName = feature.properties.ADMIN;
        setFocusedCountry(countryName);
        setFadeProgress(1); // Start at full intensity

        const isMobile = deviceType === 'mobile';
        const altitude = isMobile ? 2.5 : 1.7;
        const [lng, lat] = (feature as any).__centroid || [0, 0];
        const coords = {
          lat,
          lng,
          altitude,
        };
        globeRef.pointOfView(coords, 1000);

        // Start fade out after 1 second, fade for 1 second
        setTimeout(() => {
          const startTime = Date.now();
          const fadeDuration = 1000; // 1 second fade

          const fade = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.max(0, 1 - elapsed / fadeDuration);

            setFadeProgress(progress);

            if (progress > 0) {
              requestAnimationFrame(fade);
            } else {
              setFocusedCountry(null);
            }
          };

          requestAnimationFrame(fade);
        }, 1000); // Start fading after 1 second
      }
    },
    [deviceType]
  );

  return { focusCountry, focusedCountry, fadeProgress };
}
