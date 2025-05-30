import styles from './IndicatorSection.module.css';

export default function NoDataMessage() {
  return (
    <div className={styles.item}>
      <div className={styles.label}>
        <i className={`fas fa-exclamation-circle ${styles.iconFaded}`} />
        No data available
      </div>
    </div>
  );
}
