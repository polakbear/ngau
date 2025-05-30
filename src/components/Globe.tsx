import { useRef, useState, useEffect } from 'react';
import { useGeoDataContext } from '../contexts/GeoDataContext';
import useScoreType from '../hooks/useScoreType';
import { useWindowSize } from '../hooks/useWindowSize';
import { usePolygonHover } from '../hooks/usePolygonHover';
import Globe from 'react-globe.gl';
// import { geoCentroid } from 'd3-geo';
import { InfoPanelState } from '../types';
import { handlePolygonClick } from '../utils/poly';
import { useDeviceType } from '../hooks/useDeviceType';
import { Tooltip } from './Tooltip';
import { InfoPanel } from './InfoPanel';
import { getOrCreatePolygonMaterial } from './OptimizedPolyMaterial';
import { useMemoizedCallback } from '../hooks/useMemoizedCallback';

interface GlobeComponentProps {
  setGlobeRef: (ref: any) => void;
}
export default function GlobeComponent({ setGlobeRef }: GlobeComponentProps) {
  const [infoPanel, setInfoPanel] = useState<InfoPanelState>(null);
  const { geoJson, data } = useGeoDataContext();
  const dimensions = useWindowSize(100);

  const { hoveredFeature, tooltip, handleHover } = usePolygonHover();
  const { scoreType } = useScoreType();
  const deviceType = useDeviceType();
  const mobileMode = deviceType === 'mobile';

  const globeRef = useRef<any>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const infoPanelRef = useRef<HTMLDivElement>(null);

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
    function onMouseMove(e: MouseEvent) {
      if (tooltip && tooltipRef.current) {
        tooltipRef.current.style.left = `${e.pageX + 10}px`;
        tooltipRef.current.style.top = `${e.pageY + 10}px`;
      }
    }
    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, [tooltip]);

  const getPolygonCapMaterial = (d: any) => {
    return getOrCreatePolygonMaterial(d, data, hoveredFeature, 0, scoreType);
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
