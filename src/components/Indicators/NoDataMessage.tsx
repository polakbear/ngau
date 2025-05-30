import styles from './IndicatorSection.module.css';
import iconStyles from './Indicators.module.css';

export default function NoDataMessage() {
  return (
    <div className={styles.item}>
      <div className={styles.label}>
        <i className={`fas fa-exclamation-circle ${iconStyles.iconFaded}`} />
        No data available
      </div>
    </div>
  );
}
