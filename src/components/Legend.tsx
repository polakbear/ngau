import { getGradientStyle } from '../utils/color';
import styles from './Legend.module.css';

export function Legend() {
  const gradientStyle = getGradientStyle();

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
