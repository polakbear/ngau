import useScoreType from '../hooks/useScoreType';
import styles from './ScoreTabs.module.css';
import { Methodology } from './Methodology';
import { Organizations } from './Organizations';
import { useState } from 'react';

export function ScoreTabs() {
  const { scoreType, setScoreType } = useScoreType();
  const [showOrganizations, setShowOrganizations] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.tabsContainer}>
        <button
          className={`${styles.tab} ${scoreType === 'overall' ? styles.active : ''}`}
          onClick={() => {
            setScoreType('overall');
            setShowOrganizations(false);
          }}
        >
          Overall
        </button>
        <button
          className={`${styles.tab} ${scoreType === 'ranking_life' ? styles.active : ''}`}
          onClick={() => {
            setScoreType('ranking_life');
            setShowOrganizations(false);
          }}
        >
          Life
        </button>
        <button
          className={`${styles.tab} ${scoreType === 'ranking_health' ? styles.active : ''}`}
          onClick={() => {
            setScoreType('ranking_health');
            setShowOrganizations(false);
          }}
        >
          Health
        </button>
        <button
          className={`${styles.tab} ${scoreType === 'ranking_education' ? styles.active : ''}`}
          onClick={() => {
            setScoreType('ranking_education');
            setShowOrganizations(false);
          }}
        >
          Education
        </button>
        <button
          className={`${styles.tab} ${scoreType === 'ranking_protection' ? styles.active : ''}`}
          onClick={() => {
            setScoreType('ranking_protection');
            setShowOrganizations(false);
          }}
        >
          Protection
        </button>
        <button
          className={`${styles.tab} ${scoreType === 'ranking_environment' ? styles.active : ''}`}
          onClick={() => {
            setScoreType('ranking_environment');
            setShowOrganizations(false);
          }}
        >
          Empowerment
        </button>
        <button
          className={`${styles.tab} ${showOrganizations ? styles.active : ''}`}
          onClick={() => {
            setShowOrganizations(!showOrganizations);
          }}
        >
          <i className="fa fa-hands-helping" /> Take Action
        </button>
        <Methodology />
      </div>
      {showOrganizations && <Organizations />}
    </div>
  );
}
