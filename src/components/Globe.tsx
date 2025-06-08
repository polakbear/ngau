import { useContext, useRef, useState, useEffect } from 'react';
import { SearchContext } from '../contexts/SearchContext';
import { useGeoData } from '../hooks/useGeoData';
import useScoreType from '../hooks/useScoreType';
import { useWindowSize } from '../hooks/useWindowSize';
import { usePolygonHover } from '../hooks/usePolygonHover';
import Globe from 'react-globe.gl';
// import { geoCentroid } from 'd3-geo';
import { InfoPanelState } from '../types';
import { handlePolygonClick } from '../utils/poly';
import { useDeviceType } from '../hooks/useDeviceType';
import { Tooltip } from './Tooltip';
import { getOrCreatePolygonMaterial } from './OptimizedPolyMaterial';
import { useMemoizedCallback } from '../hooks/useMemoizedCallback';
import { InfoPanel } from './InfoPanel/InfoPanel';

export default function GlobeComponent() {
  const [infoPanel, setInfoPanel] = useState<InfoPanelState>(null);
  const { geoJson, data } = useGeoData();
  const dimensions = useWindowSize(100);

  const { hoveredFeature, tooltip, handleHover } = usePolygonHover(!!infoPanel);
  const { scoreType } = useScoreType();
  const deviceType = useDeviceType();
  const mobileMode = deviceType === 'mobile';

  const globeRef = useRef<any>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const infoPanelRef = useRef<HTMLDivElement>(null);

  const { setGlobeRef, focusedCountry, fadeProgress } =
    useContext(SearchContext);

  useEffect(() => {
    if (globeRef.current) {
      setGlobeRef(globeRef.current);
      globeRef.current.pointOfView(
        { lat: 0, lng: 0, altitude: mobileMode ? 4 : 2.5 },
        0
      );
    }
  }, [globeRef, mobileMode, setGlobeRef]);

  useEffect(() => {
    if (!tooltip || !tooltipRef.current) return;

    const tooltipElement = tooltipRef.current;

    function onMouseMove(e: MouseEvent) {
      tooltipElement.style.left = `${e.pageX + 10}px`;
      tooltipElement.style.top = `${e.pageY + 10}px`;
    }

    window.addEventListener('mousemove', onMouseMove);

    // Cleanup function
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, [tooltip]);

  const getPolygonCapMaterial = (d: any) => {
    return getOrCreatePolygonMaterial(
      d,
      data,
      hoveredFeature,
      0,
      scoreType,
      focusedCountry,
      fadeProgress
    );
  };

  const handlePolygonClickMemoized = useMemoizedCallback(
    (feat: any) => handlePolygonClick(feat, data, () => {}, setInfoPanel),
    [data, setInfoPanel]
  );

  return (
    <div
      id="globe"
      style={{ width: '100vw', height: '100vh', position: 'fixed' }}
    >
      <Globe
        ref={globeRef}
        width={dimensions.width}
        height={dimensions.height}
        polygonsData={geoJson ? geoJson.features : []}
        polygonCapMaterial={getPolygonCapMaterial}
        polygonSideColor={() => '#000000'}
        polygonAltitude={(d) => (d === hoveredFeature ? 0.02 : 0.01)}
        polygonsTransitionDuration={300}
        onPolygonHover={(polygon) => handleHover(polygon, data)}
        onPolygonClick={handlePolygonClickMemoized}
        globeImageUrl=""
        showAtmosphere
        atmosphereColor="#3fd1c7"
        atmosphereAltitude={mobileMode ? 0.2 : 0.25}
        backgroundColor="#0a1d26"
        polygonStrokeColor={() => 'rgba(255,255,255,0.6)'}
        enablePointerInteraction={true}
      />

      <div
        ref={tooltipRef}
        style={{
          display: tooltip ? 'block' : 'none',
          position: 'absolute',
          left: 0,
          top: 0,
        }}
      >
        {tooltip && (
          <Tooltip
            countryName={tooltip.countryName}
            country={tooltip.country}
          />
        )}
      </div>

      <div
        ref={infoPanelRef}
        style={{
          display: infoPanel ? 'block' : 'none',
        }}
      >
        {infoPanel && infoPanel.country && (
          <InfoPanel
            countryName={infoPanel.countryName}
            country={infoPanel.country}
            onClose={() => setInfoPanel(null)}
          />
        )}
      </div>
    </div>
  );
}
