import React from 'react';

interface ProgressBarProps {
  label: React.ReactNode;
  value: number;
  max?: number;
  compact?: boolean;
  customClass?: string;
}

export default function ProgressBar({
  label,
  value,
  max = 100,
  compact = false,
  customClass = '',
}: ProgressBarProps) {
  const percentage = Math.min(100, (value / max) * 100);
  const labelClass = compact ? 'indicator-label compact' : 'indicator-label';

  return (
    <div className="indicator-item">
      <div className={labelClass}>{label}</div>
      <div className="indicator-value-bar">
        <div className="indicator-bar-container">
          <div
            className={`indicator-bar-fill ${customClass}`}
            style={{
              width: `${percentage}%`,
              transition: 'width 0.6s cubic-bezier(.4,0,.2,1)',
            }}
            data-percentage={percentage}
          />
        </div>
        <span className="indicator-value">
          {value}
          <span style={{ fontSize: 9, opacity: 0.8 }}>%</span>
        </span>
      </div>
    </div>
  );
}
