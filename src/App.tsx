import SearchProvider from './contexts/SearchProvider';
import GlobeComponent from './components/Globe';
import ScoreTypeProvider from './contexts/ScoreTypeProvider';
import { Legend } from './components/Legend';
import { Sources } from './components/Sources';
import { TabRow } from './components/TabRow';
import TakeActionButton from './components/TakeActionButton';
import Search from './components/Search/Search';
import { GeoDataProvider } from './contexts/GeoDataProvider';
import TabHoverProvider from './contexts/TabHoverProvider';

function App() {
  return (
    <SearchProvider>
      <TabHoverProvider>
        <ScoreTypeProvider>
          <GeoDataProvider>
            <TabRow />
            <GlobeComponent />
            <Legend />
            <Sources />
            <Search />
            <TakeActionButton />
          </GeoDataProvider>
        </ScoreTypeProvider>
      </TabHoverProvider>
    </SearchProvider>
  );
}

export default App;
