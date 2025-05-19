import { useState, useEffect, useRef } from 'react';
import Globe from 'react-globe.gl';
import { geoCentroid } from 'd3-geo';
import {
  CountryData,
  GeoJsonFeature,
  InfoPanelState,
  TooltipState,
} from '../types';
import { handlePolygonClick } from '../utils/poly';
import { detectMobileMode, detectDeviceType } from '../utils/device';
import { Tooltip } from './Tooltip';
import { InfoPanel } from './InfoPanel';
import useScoreType from '../hooks/useScoreType';
import { getOrCreatePolygonMaterial } from './OptimizedPolyMaterial';
import { createOptimizedPolygonHover } from '../utils/optimized-hover';

interface GlobeComponentProps {
  setGlobeRef: (ref: any) => void;
  onDataLoaded: (geoJson: any) => void;
}

export default function GlobeComponent({
  setGlobeRef,
  onDataLoaded,
}: GlobeComponentProps) {
  const [geoJson, setGeoJson] = useState<any>(null);
  const [data, setData] = useState<CountryData[]>([]);
  const [hoverD, setHoverD] = useState<GeoJsonFeature | null>(null);
  const [tooltip, setTooltip] = useState<TooltipState>(null);
  const [infoPanel, setInfoPanel] = useState<InfoPanelState>(null);
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const { scoreType } = useScoreType();
  const mobileMode = detectMobileMode();

  const globeRef = useRef<any>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const infoPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('/countries.geojson')
      .then((res) => res.json())
      .then((data) => {
        // calculate centroids for each feature - needed for panning when searching
        data.features.forEach((f: any) => {
          f.__centroid = geoCentroid(f);
        });
        setGeoJson(data);
        onDataLoaded(data);
      });
    fetch('/data.json')
      .then((res) => res.json())
      .then(setData);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const newDimensions = {
        width: window.innerWidth,
        height: window.innerHeight,
      };
      setDimensions(newDimensions);
    };

    handleResize();

    // throttled event listener
    let timeoutId: NodeJS.Timeout;
    const throttledResize = () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(handleResize, 100);
    };

    window.addEventListener('resize', throttledResize);
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      window.removeEventListener('resize', throttledResize);
    };
  }, []);

  useEffect(() => {
    if (globeRef.current) {
      setGlobeRef(globeRef.current);
      globeRef.current.pointOfView(
        { lat: 0, lng: 0, altitude: mobileMode ? 4 : 2.5 },
        0
      );
    }
  }, [globeRef, mobileMode, setGlobeRef]);

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
      setTooltip: (tooltip) => {
        const deviceType = detectDeviceType();
        if (deviceType === 'desktop') {
          setTooltip(tooltip);
        }
      },
      setHoverD,
      data,
      mousePositionRef,
    })
  );

  const handlePolygonClickMemoized = useRef((feat: any) => {
    const deviceType = detectDeviceType();
    handlePolygonClick(
      feat,
      data,
      deviceType === 'desktop' ? setTooltip : () => {},
      setInfoPanel
    );
  });

  const getPolygonCapMaterial = (d: any) => {
    return getOrCreatePolygonMaterial(d, data, hoverD, 0, scoreType);
  };

  useEffect(() => {
    handlePolygonHoverOptimized.current = createOptimizedPolygonHover({
      setTooltip: (tooltip) => {
        const deviceType = detectDeviceType();
        if (deviceType === 'desktop') {
          setTooltip(tooltip);
        }
      },
      setHoverD,
      data,
      mousePositionRef,
    });

    handlePolygonClickMemoized.current = (feat: any) => {
      const deviceType = detectDeviceType();
      handlePolygonClick(
        feat,
        data,
        deviceType === 'desktop' ? setTooltip : () => {},
        setInfoPanel
      );
    };
  }, [data, scoreType, setTooltip, setInfoPanel]);

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
