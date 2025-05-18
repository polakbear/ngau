import {
  colors,
  getBarColor,
  getContrastingTextColor,
  rankBasedColorScale,
} from '../utils/color';
import { getPerformanceLabel } from '../utils/score';
import styles from './MetricRow.module.css';

interface MetricRowProps {
  iconClass: string;
  label: string;
  value: number | null | undefined;
  rank: number | null | undefined;
}

export default function MetricRow({
  iconClass,
  label: _label, // not used but required by interface, look into it later
  value,
  rank,
}: MetricRowProps) {
  const total = 194;
  const performance = getPerformanceLabel(rank ?? null, total);
  const color = rank ? rankBasedColorScale(rank) : colors.noData;

  return (
    <div className={styles.metric}>
      <div className={styles.label}>
        <i className={iconClass}></i>
      </div>
      <div className={styles.info}>
        <div className={styles.row}>
          <div className={styles.splitBadge}>
            {rank != null && (
              <span className={styles.splitLeft}>
                Rank {String(rank).padStart(3, '\u00A0')}
              </span>
            )}
            <span
              className={styles.splitRight}
              style={{
                background: color,
                color: getContrastingTextColor(color),
              }}
            >
              {performance}
            </span>
          </div>
          <span className={styles.value}>
            {value != null ? value.toFixed(3) : ''}
          </span>
        </div>
        <div className={styles.barContainer}>
          <div
            className={styles.barFill}
            style={{
              width: value != null ? `${value * 100}%` : '0%',
              background: getBarColor(rank),
              transition: 'width 0.6s cubic-bezier(.4,0,.2,1)',
            }}
            data-score={value || 0}
          ></div>
        </div>
      </div>
    </div>
  );
}
