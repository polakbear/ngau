import useScoreType from '../hooks/useScoreType';
import styles from './ScoreTabs.module.css';
import { Methodology } from './Methodology';

export function ScoreTabs() {
  const { scoreType, setScoreType } = useScoreType();

  return (
    <div className={styles.container}>
      <div className={styles.tabsContainer}>
        <button
          className={`${styles.tab} ${scoreType === 'overall' ? styles.active : ''}`}
          onClick={() => setScoreType('overall')}
        >
          Overall
        </button>
        <button
          className={`${styles.tab} ${scoreType === 'ranking_life' ? styles.active : ''}`}
          onClick={() => setScoreType('ranking_life')}
        >
          Life
        </button>
        <button
          className={`${styles.tab} ${scoreType === 'ranking_health' ? styles.active : ''}`}
          onClick={() => setScoreType('ranking_health')}
        >
          Health
        </button>
        <button
          className={`${styles.tab} ${scoreType === 'ranking_education' ? styles.active : ''}`}
          onClick={() => setScoreType('ranking_education')}
        >
          Education
        </button>
        <button
          className={`${styles.tab} ${scoreType === 'ranking_protection' ? styles.active : ''}`}
          onClick={() => setScoreType('ranking_protection')}
        >
          Protection
        </button>
        <button
          className={`${styles.tab} ${scoreType === 'ranking_environment' ? styles.active : ''}`}
          onClick={() => setScoreType('ranking_environment')}
        >
          Environment
        </button>
        <Methodology />
      </div>
    </div>
  );
}
