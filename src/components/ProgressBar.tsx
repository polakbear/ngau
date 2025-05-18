import React from 'react';

interface ProgressBarProps {
  label: React.ReactNode;
  value: number;
  max?: number;
  compact?: boolean;
  customClass?: string;
}

import styles from './ProgressBar.module.css';

export default function ProgressBar({
  label,
  value,
  max = 100,
  compact = false,
  customClass = '',
}: ProgressBarProps) {
  const percentage = Math.min(100, (value / max) * 100);
  const labelClass = compact
    ? `${styles.label} ${styles.compact}`
    : styles.label;

  return (
    <div className={styles.item}>
      <div className={labelClass}>{label}</div>
      <div className={styles.valueBar}>
        <div className={styles.barContainer}>
          <div
            className={`${styles.barFill} ${customClass}`}
            style={{
              width: `${percentage}%`,
              transition: 'width 0.6s cubic-bezier(.4,0,.2,1)',
            }}
          />
        </div>
        <span className={styles.value}>
          {value}
          <span style={{ fontSize: 9, opacity: 0.8 }}>%</span>
        </span>
      </div>
    </div>
  );
}
