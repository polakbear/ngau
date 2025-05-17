import useScoreType from '../hooks/useScoreType';

export function ScoreTabs() {
  const { scoreType, setScoreType } = useScoreType();

  return (
    <div className="score-tabs-container">
      <button
        className={`score-tab ${scoreType === 'overall' ? 'active' : ''}`}
        onClick={() => setScoreType('overall')}
      >
        Overall
      </button>
      <button
        className={`score-tab ${scoreType === 'ranking_life' ? 'active' : ''}`}
        onClick={() => setScoreType('ranking_life')}
      >
        Life
      </button>
      <button
        className={`score-tab ${scoreType === 'ranking_health' ? 'active' : ''}`}
        onClick={() => setScoreType('ranking_health')}
      >
        Health
      </button>
      <button
        className={`score-tab ${scoreType === 'ranking_education' ? 'active' : ''}`}
        onClick={() => setScoreType('ranking_education')}
      >
        Education
      </button>
      <button
        className={`score-tab ${scoreType === 'ranking_protection' ? 'active' : ''}`}
        onClick={() => setScoreType('ranking_protection')}
      >
        Protection
      </button>
      <button
        className={`score-tab ${scoreType === 'ranking_environment' ? 'active' : ''}`}
        onClick={() => setScoreType('ranking_environment')}
      >
        Empowerment
      </button>
    </div>
  );
}
