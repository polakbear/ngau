import { CountryData } from '../types';
import { rankBasedColorScale, getContrastingTextColor } from '../utils/color';
import { getFullLabel } from '../utils/score';
import MetricRow from './MetricRow';
import styles from './Tooltip.module.css';

export function Tooltip({
  countryName,
  country,
  closeButton,
  onClose,
}: {
  countryName: string;
  country: CountryData | undefined;
  closeButton?: boolean;
  onClose?: () => void;
}) {
  const total = 194;
  const rank = country?.kri_rank ?? null;
  const kri = country?.kri_score ?? null;

  if (!country || rank === null) {
    return (
      <div className={styles.tooltip}>
        {closeButton && (
          <div style={{ position: 'absolute', top: 12, right: 12 }}>
            <button onClick={onClose} className="pinned-icon" title="Pinned">
              <i className="fas fa-thumbtack" />
            </button>
          </div>
        )}

        <div className={styles.header}>{countryName}</div>
        <div
          style={{
            color: '#888',
            marginTop: '30px',
            textAlign: 'center',
            padding: '40px 0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100px',
          }}
        >
          <div>
            <i
              className="fas fa-info-circle"
              style={{ marginRight: '8px', opacity: 0.6 }}
            ></i>
            No data provided
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.tooltip}>
      {closeButton && (
        <div style={{ position: 'absolute', top: 12, right: 12 }}>
          <button onClick={onClose} className="pinned-icon" title="Pinned">
            <i className="fas fa-thumbtack" />
          </button>
        </div>
      )}

      <div className={styles.header}>{countryName}</div>

      <div className={styles.badgesRow}>
        <div className={styles.badge}>
          <i
            className="fa fa-star"
            style={{
              color: '#3fd1c7',
              width: '10px',
              textAlign: 'center',
              fontSize: '10px',
              marginRight: 4,
            }}
          />
          <strong style={{ marginRight: '2px', fontSize: '10px' }}>KRI</strong>{' '}
          {kri != null ? kri.toFixed(3) : 'N/A'}
          <span className={styles.divider}>|</span>
          <strong style={{ marginRight: '2px', fontSize: '10px' }}>
            Rank
          </strong>{' '}
          {rank} / {total}
        </div>
        <div
          className={styles.qualBadge}
          style={{
            backgroundColor: rankBasedColorScale(rank),
            color: getContrastingTextColor(rankBasedColorScale(rank)),
          }}
        >
          {getFullLabel(rank, total)}
        </div>
      </div>

      <div className={styles.metricsGrid}>
        <MetricRow
          iconClass="fa fa-seedling"
          label="Life"
          value={country?.life}
          rank={country?.ranking_life}
        />
        <MetricRow
          iconClass="fa fa-heart"
          label="Health"
          value={country?.health}
          rank={country?.ranking_health}
        />
        <MetricRow
          iconClass="fa fa-graduation-cap"
          label="Education"
          value={country?.education}
          rank={country?.ranking_education}
        />
        <MetricRow
          iconClass="fa fa-shield-alt"
          label="Protection"
          value={country?.protection}
          rank={country?.ranking_protection}
        />
        <MetricRow
          iconClass="fa fa-globe"
          label="Empowerment"
          value={country?.environment}
          rank={country?.ranking_environment}
        />
      </div>
    </div>
  );
}
