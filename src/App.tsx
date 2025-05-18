import GlobeComponent from './components/Globe';
import ScoreTypeProvider from './contexts/ScoreTypeProvider';
import { ScoreTabs } from './components/ScoreTabs';
import { Legend } from './components/Legend';
import { Sources } from './components/Sources';
import { Methodology } from './components/Methodology';

function App() {
  return (
    <ScoreTypeProvider>
      <ScoreTabs />
      <GlobeComponent />
      <Legend />
      <Sources />
      <Methodology />
    </ScoreTypeProvider>
  );
}

export default App;
