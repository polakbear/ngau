import { useState } from 'react';
import styles from './Methodology.module.css';

export function Methodology() {
  const [showMethodology, setShowMethodology] = useState(false);

  return (
    <>
      <div
        className={`${styles.container} ${showMethodology ? styles.active : ''}`}
        id="methodology-panel"
      >
        <div className={styles.section}>
          <strong>Overall (KRI Score):</strong>
          Combined measure of child rights implementation
        </div>
        <div className={styles.section}>
          <strong>Life:</strong>
          Under-5 mortality, life expectancy, maternal mortality
        </div>
        <div className={styles.section}>
          <strong>Health:</strong>
          Underweight children, immunization, sanitation, water access
        </div>
        <div className={styles.section}>
          <strong>Education:</strong>
          Schooling for girls and boys, gender gap
        </div>
        <div className={styles.section}>
          <strong>Protection:</strong>
          Child labour, adolescent birth rate, birth registration
        </div>
        <div className={styles.section}>
          <strong>Empowerment:</strong>
          Equal treatment, child voice, funding, detailed data, cooperation with
          child rights groups
        </div>
      </div>
      <button
        className={styles.toggleButton}
        onClick={() => setShowMethodology(!showMethodology)}
      >
        <i className="fas fa-info-circle"></i> Methodology
      </button>
    </>
  );
}
