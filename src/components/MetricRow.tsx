import { colors, getBarColor } from '../utils/color';
import { getPerformanceLabel } from '../utils/score';
import styles from './MetricRow.module.css';

interface MetricRowProps {
  iconClass: string;
  label?: string;
  value: number | null | undefined;
  rank: number | null | undefined;
}

export default function MetricRow({
  iconClass,
  label,
  value,
  rank,
}: MetricRowProps) {
  return (
    <div className={styles.metric}>
      <div className={styles.label}>
        <i className={iconClass}></i>
        {label}
      </div>
      <div className={styles.info}>
        <div className={styles.row}>
          {value === null || value === undefined ? (
            <span className={styles.noData}>No data</span>
          ) : (
            <div
              className={styles.badge}
              style={{
                background: `linear-gradient(to right, ${colors.veryPoor}, ${getBarColor(rank)})`,
                color: '#fff',
              }}
            >
              <span className={styles.rankText}>
                Rank {String(rank).padStart(3, '\u00A0')}
              </span>
              <span className={styles.divider}>|</span>
              <span className={styles.performanceText}>
                {getPerformanceLabel(rank ?? null, 194)}
              </span>
            </div>
          )}
        </div>
        {value != null && (
          <div className={styles.barContainer}>
            <div
              className={styles.barFill}
              style={{
                width: `${value * 100}%`,
                background: `linear-gradient(to right, ${colors.veryPoor}, ${getBarColor(rank)})`,
                transition: 'width 0.6s cubic-bezier(.4,0,.2,1)',
              }}
              data-score={value}
            ></div>
          </div>
        )}
      </div>
    </div>
  );
}
