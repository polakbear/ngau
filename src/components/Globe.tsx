import { useState, useEffect, useRef } from 'react';
import Globe from 'react-globe.gl';
import {
  CountryData,
  GeoJsonFeature,
  InfoPanelState,
  TooltipState,
} from '../types';
import { handlePolygonClick } from '../utils/poly';
import { detectMobileMode } from '../utils/device';
import { Tooltip } from './Tooltip';
import { InfoPanel } from './InfoPanel';
import useScoreType from '../hooks/useScoreType';
import { getOrCreatePolygonMaterial } from './OptimizedPolyMaterial';
import { createOptimizedPolygonHover } from '../utils/optimized-hover';

export default function GlobeComponent() {
  const [geoJson, setGeoJson] = useState<any>(null);
  const [data, setData] = useState<CountryData[]>([]);
  const [hoverD, setHoverD] = useState<GeoJsonFeature | null>(null);
  const [tooltip, setTooltip] = useState<TooltipState>(null);
  const [infoPanel, setInfoPanel] = useState<InfoPanelState>(null);

  const { scoreType } = useScoreType();
  const mobileMode = detectMobileMode();

  const globeRef = useRef<any>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const infoPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('/countries.geojson')
      .then((res) => res.json())
      .then(setGeoJson);
    fetch('/data.json')
      .then((res) => res.json())
      .then(setData);
  }, []);

  useEffect(() => {
    if (globeRef.current) {
      globeRef.current.pointOfView(
        { lat: 0, lng: 0, altitude: mobileMode ? 4 : 2 },
        0
      );
    }
  }, [globeRef, mobileMode]);

  const mousePositionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    function trackMousePosition(e: MouseEvent) {
      mousePositionRef.current = { x: e.pageX, y: e.pageY };
    }

    window.addEventListener('mousemove', trackMousePosition);
    return () => window.removeEventListener('mousemove', trackMousePosition);
  }, []);

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

  const handlePolygonHoverOptimized = useRef(
    createOptimizedPolygonHover({
      setTooltip,
      setHoverD,
      data,
      mousePositionRef,
    })
  );

  const handlePolygonClickMemoized = useRef((feat: any) =>
    handlePolygonClick(feat, data, setTooltip, setInfoPanel)
  );

  const getPolygonCapMaterial = (d: any) => {
    return getOrCreatePolygonMaterial(d, data, hoverD, 0, scoreType);
  };

  useEffect(() => {
    handlePolygonHoverOptimized.current = createOptimizedPolygonHover({
      setTooltip,
      setHoverD,
      data,
      mousePositionRef,
    });

    handlePolygonClickMemoized.current = (feat: any) =>
      handlePolygonClick(feat, data, setTooltip, setInfoPanel);
  }, [data, scoreType, setTooltip, setInfoPanel]);

  return (
    <div
      id="globe"
      style={{ width: '100vw', height: '100vh', position: 'fixed' }}
    >
      <Globe
        ref={globeRef}
        width={window.innerWidth}
        height={window.innerHeight}
        polygonsData={geoJson ? geoJson.features : []}
        polygonCapMaterial={getPolygonCapMaterial}
        polygonSideColor={() => '#000000'}
        polygonAltitude={(d) => (d === hoverD ? 0.02 : 0.01)}
        polygonsTransitionDuration={300}
        onPolygonHover={handlePolygonHoverOptimized.current}
        onPolygonClick={handlePolygonClickMemoized.current}
        globeImageUrl=""
        showAtmosphere
        atmosphereColor="#3fd1c7"
        atmosphereAltitude={mobileMode ? 0.2 : 0.25}
        backgroundColor="#0a1d26"
        polygonStrokeColor={() => 'rgba(255,255,255,0.6)'}
      />

      <div
        ref={tooltipRef}
        style={{
          display: tooltip ? 'block' : 'none',
          position: 'absolute',
          left: 0,
          top: 0,
          zIndex: 10,
          background: 'rgba(0,0,0,0.75)',
          color: 'white',
          padding: '16px',
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
          backdropFilter: 'blur(8px)',
          width: '320px',
          maxWidth: '320px',
          willChange: 'transform',
          transform: 'translateZ(0)',
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
          position: 'absolute',
          left: 50,
          top: 50,
          zIndex: 20,
          background: 'rgba(0,0,0,0.85)',
          color: '#fff',
          padding: '1rem',
          maxWidth: 350,
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
