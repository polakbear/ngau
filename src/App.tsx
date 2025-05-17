import GlobeComponent from './components/Globe';
import ScoreTypeProvider from './contexts/ScoreTypeProvider';
import { ScoreTabs } from './components/ScoreTabs';
import { Legend } from './components/Legend';
import { Methodology } from './components/Methodology';
import { Sources } from './components/Sources';

function App() {
  return (
    <ScoreTypeProvider>
      <Methodology />
      <ScoreTabs />
      <GlobeComponent />
      <Legend />
      <Sources />
    </ScoreTypeProvider>
  );
}

export default App;
