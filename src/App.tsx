import { useState, useCallback } from 'react';
import GlobeComponent from './components/Globe';
import ScoreTypeProvider from './contexts/ScoreTypeProvider';
import { Legend } from './components/Legend';
import { Sources } from './components/Sources';
import { TabRow } from './components/TabRow';
import TakeActionButton from './components/TakeActionButton';
import Search from './components/Search';
import { GeoJsonFeature } from './types';
import { detectMobileMode } from './utils/device';
import TabHoverProvider from './contexts/TabHoverProvider';

function App() {
  const [geoJson, setGeoJson] = useState<any>(null);

  const [globeRef, setGlobeRef] = useState<any>(null);

  const handleCountryFound = useCallback(
    (feature: GeoJsonFeature) => {
      if (globeRef && feature.properties) {
        const isMobile = detectMobileMode();
        const altitude = isMobile ? 2.5 : 1.7;
        const [lng, lat] = (feature as any).__centroid || [0, 0];
        globeRef.pointOfView(
          {
            lat,
            lng,
            altitude,
          },
          1000
        );
      }
    },
    [globeRef]
  );

  return (
    <TabHoverProvider>
      <ScoreTypeProvider>
        <TabRow />
        <GlobeComponent setGlobeRef={setGlobeRef} onDataLoaded={setGeoJson} />
        <Legend />
        <Sources />
        <Search geoJson={geoJson} onCountryFound={handleCountryFound} />
        <TakeActionButton />
      </ScoreTypeProvider>
    </TabHoverProvider>
  );
}

export default App;
