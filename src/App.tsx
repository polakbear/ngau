import GlobeComponent from './components/Globe';
import ScoreTypeProvider from './contexts/ScoreTypeProvider';
import { Legend } from './components/Legend';
import { Sources } from './components/Sources';
import { TabRow } from './components/TabRow';
import TakeActionButton from './components/TakeActionButton';

function App() {
  return (
    <ScoreTypeProvider>
      <TabRow />
      <GlobeComponent />
      <Legend />
      <Sources />
      <TakeActionButton />
    </ScoreTypeProvider>
  );
}

export default App;
