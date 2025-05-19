import { useState, useEffect, useRef, useMemo } from 'react';
import Globe from 'react-globe.gl';
import { geoCentroid } from 'd3-geo';
import { CountryData, InfoPanelState } from '../types';
import { handlePolygonClick } from '../utils/poly';
import { detectMobileMode } from '../utils/device';
import { Tooltip } from './Tooltip';
import { InfoPanel } from './InfoPanel';
import useScoreType from '../hooks/useScoreType';
import { getOrCreatePolygonMaterial } from './OptimizedPolyMaterial';
import { useDeviceHover } from '../hooks/useDeviceHover';
import { getMarkerData } from './AgeMarkers';

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
  const [infoPanel, setInfoPanel] = useState<InfoPanelState>(null);
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const { hoverD, tooltip, handleHover } = useDeviceHover();
  const { scoreType } = useScoreType();
  const mobileMode = detectMobileMode();

  const globeRef = useRef<any>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const infoPanelRef = useRef<HTMLDivElement>(null);

  const markerData = useMemo(() => {
    if (scoreType === 'criminal_minimum_age') {
      return getMarkerData(data, geoJson);
    }
    return [];
  }, [data, geoJson, scoreType]);

  console.log('markerData', markerData);

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
  }, [onDataLoaded]);

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
    return getOrCreatePolygonMaterial(d, data, hoverD, 0, scoreType);
  };

  const handlePolygonClickMemoized = useRef((feat: any) =>
    handlePolygonClick(feat, data, () => {}, setInfoPanel)
  );

  useEffect(() => {
    handlePolygonClickMemoized.current = (feat: any) =>
      handlePolygonClick(feat, data, () => {}, setInfoPanel);
  }, [data, setInfoPanel]);

  const markerSvg = `<svg viewBox="-4 0 36 36">
    <path fill="currentColor" d="M14,0 C21.732,0 28,5.641 28,12.6 C28,23.963 14,36 14,36 C14,36 0,24.064 0,12.6 C0,5.641 6.268,0 14,0 Z"></path>
    <circle fill="black" cx="14" cy="14" r="7"></circle>
  </svg>`;

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
        onPolygonHover={(polygon) => handleHover(polygon, data)}
        onPolygonClick={handlePolygonClickMemoized.current}
        globeImageUrl=""
        showAtmosphere
        atmosphereColor="#3fd1c7"
        atmosphereAltitude={mobileMode ? 0.2 : 0.25}
        backgroundColor="#0a1d26"
        polygonStrokeColor={() => 'rgba(255,255,255,0.6)'}
        enablePointerInteraction={true}
        htmlElementsData={markerData}
        htmlElement={(d: any) => {
          const el = document.createElement('div');
          el.innerHTML = markerSvg;
          el.style.width = '12px';
          el.style.height = '12px';
          el.style.backgroundColor = d.color;
          el.style.borderRadius = '50%';
          el.style.transition = 'opacity 250ms';
          el.title = `${d.country}: ${d.age} years`;
          return el;
        }}
        htmlElementVisibilityModifier={(el, isVisible) => {
          el.style.opacity = isVisible ? '1' : '0';
        }}
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
