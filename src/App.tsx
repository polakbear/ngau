import GlobeComponent from './components/Globe';
import ScoreTypeProvider from './contexts/ScoreTypeProvider';
import TabHoverProvider from './contexts/TabHoverProvider';
import { GeoDataProvider } from './contexts/GeoDataContext';
import { Legend } from './components/Legend';
import { Sources } from './components/Sources';
import { TabRow } from './components/TabRow';
import TakeActionButton from './components/TakeActionButton';
import Search from './components/Search/Search';
import { SearchProvider } from './contexts/SearchProvider';

function App() {
  return (
    <TabHoverProvider>
      <ScoreTypeProvider>
        <GeoDataProvider>
          <SearchProvider>
            <TabRow />
            <GlobeComponent />
            <Legend />
            <Sources />
            <Search />
            <TakeActionButton />
          </SearchProvider>
        </GeoDataProvider>
      </ScoreTypeProvider>
    </TabHoverProvider>
  );
}

export default App;
