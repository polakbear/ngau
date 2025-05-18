import GlobeComponent from './components/Globe';
import ScoreTypeProvider from './contexts/ScoreTypeProvider';
import { Legend } from './components/Legend';
import { Sources } from './components/Sources';
import { TabRow } from './components/TabRow';

function App() {
  return (
    <ScoreTypeProvider>
      <TabRow />
      <GlobeComponent />
      <Legend />
      <Sources />
    </ScoreTypeProvider>
  );
}

export default App;
