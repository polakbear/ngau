import {
  colors,
  getBarColor,
  getContrastingTextColor,
  rankBasedColorScale,
} from '../utils/color';
import { getPerformanceLabel } from '../utils/score';

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
    <div className="tooltip-metric">
      <div
        className="metric-label"
        style={{ width: '24px', textAlign: 'center', marginRight: '12px' }}
      >
        <i className={iconClass}></i>
      </div>
      <div className="metric-info" style={{ width: 'calc(100% - 36px)' }}>
        <div
          className="metric-row"
          style={{ justifyContent: 'space-between', gap: '8px', width: '100%' }}
        >
          <div className="split-badge" style={{ minWidth: '120px' }}>
            {rank != null && (
              <span className="split-left">
                Rank {String(rank).padStart(3, '\u00A0')}
              </span>
            )}
            <span
              className="split-right"
              style={{
                background: color,
                color: getContrastingTextColor(color),
                width: '80px',
              }}
            >
              {performance}
            </span>
          </div>
          <span
            className="value"
            style={{ minWidth: '50px', textAlign: 'right' }}
          >
            {value != null ? value.toFixed(3) : ''}
          </span>
        </div>
        <div className="bar-container">
          <div
            className="bar-fill"
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
