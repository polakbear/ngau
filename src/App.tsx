import { useState, useCallback } from 'react';
import GlobeComponent from './components/Globe';
import ScoreTypeProvider from './contexts/ScoreTypeProvider';
import { Legend } from './components/Legend';
import { Sources } from './components/Sources';
import { TabRow } from './components/TabRow';
import TakeActionButton from './components/TakeActionButton';
import Search from './components/Search/Search';
import SearchProvider from './contexts/SearchProvider';
import { GeoJsonFeature } from './types';
import { useDeviceType } from './hooks/useDeviceType';
import { GeoDataProvider } from './contexts/GeoDataContext';
import TabHoverProvider from './contexts/TabHoverProvider';

function App() {
  const [globeRef, setGlobeRef] = useState<any>(null);
  const deviceType = useDeviceType();

  const handleCountryFound = useCallback(
    (feature: GeoJsonFeature) => {
      if (globeRef && feature.properties) {
        const isMobile = deviceType === 'mobile';
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
    [globeRef, deviceType]
  );

  return (
    <TabHoverProvider>
      <ScoreTypeProvider>
        <GeoDataProvider>
          <SearchProvider>
            <TabRow />
            <GlobeComponent setGlobeRef={setGlobeRef} />
            <Legend />
            <Sources />
            <Search onCountryFound={handleCountryFound} />
            <TakeActionButton />
          </SearchProvider>
        </GeoDataProvider>
      </ScoreTypeProvider>
    </TabHoverProvider>
  );
}

export default App;
