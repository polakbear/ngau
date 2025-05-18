import { useMemo } from 'react';
import { rankBasedColorScale } from '../utils/color';
import styles from './Legend.module.css';

export function Legend() {
  const gradientStyle = useMemo(() => {
    const MAX_RANK = 194;
    const colorStops: string[] = [];
    const numStops = 20;

    for (let i = 0; i < numStops; i++) {
      const rank = Math.round(MAX_RANK - (i * (MAX_RANK - 1)) / (numStops - 1));
      const percent = (i / (numStops - 1)) * 100;
      const color = rankBasedColorScale(rank);
      colorStops.push(`${color} ${percent}%`);
    }

    return {
      background: `linear-gradient(to right, ${colorStops.join(', ')})`,
    };
  }, []);

  return (
    <div className={styles.legend}>
      <div className={styles.container}>
        <div className={styles.noData}></div>
        <div className={styles.scale}>
          <div className={styles.bar}>
            <div className={styles.gradient} style={gradientStyle}></div>
          </div>
        </div>
        <div className={styles.labelNoData}>No data</div>{' '}
        <div className={styles.gradientLabels}>
          <span className={styles.labelVeryPoor}>Very Poor</span>
          <span className={styles.labelPoor}>Poor</span>
          <span className={styles.labelFair}>Fair</span>
          <span className={styles.labelGood}>Good</span>
          <span className={styles.labelExcellent}>Excellent</span>
        </div>
      </div>
    </div>
  );
}
