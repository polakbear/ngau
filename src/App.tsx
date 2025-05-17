import GlobeComponent from './components/Globe';
import ScoreTypeProvider from './contexts/ScoreTypeProvider';
import { ScoreTabs } from './components/ScoreTabs';
import { Legend } from './components/Legend';

function App() {
  return (
    <ScoreTypeProvider>
      <Legend />
      <ScoreTabs />
      <GlobeComponent />
    </ScoreTypeProvider>
  );
}

export default App;
