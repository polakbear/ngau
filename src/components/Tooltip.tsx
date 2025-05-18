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
          value={country?.life}
          rank={country?.ranking_life}
        />
        <MetricRow
          iconClass="fa fa-heart"
          value={country?.health}
          rank={country?.ranking_health}
        />
        <MetricRow
          iconClass="fa fa-graduation-cap"
          value={country?.education}
          rank={country?.ranking_education}
        />
        <MetricRow
          iconClass="fa fa-shield-alt"
          value={country?.protection}
          rank={country?.ranking_protection}
        />
        <MetricRow
          iconClass="fa fa-globe"
          value={country?.environment}
          rank={country?.ranking_environment}
        />
      </div>

      {/* Indicator Icons */}
      {country.indicators && country.indicators.length > 0 && (
        <div className={styles.indicatorIcons}>
          <div className={styles.indicatorLabel}>More data available:</div>
          <div className={styles.indicatorList}>
            {country.indicators.some(
              (i) =>
                i.indicator_type === 'female_child_marriage' ||
                i.indicator_type === 'male_child_marriage'
            ) && (
              <div className={styles.indicatorItem}>
                <i className="fas fa-ring" style={{ color: '#ff9f43' }} />
                <span>Child Marriage</span>
              </div>
            )}
            {country.indicators.some(
              (i) => i.indicator_type === 'violent_discipline'
            ) && (
              <div className={styles.indicatorItem}>
                <i className="fas fa-hand" style={{ color: '#ff9f43' }} />
                <span>Violent Discipline</span>
              </div>
            )}
            {country.indicators.some((i) => i.indicator_type === 'fgm') && (
              <div className={styles.indicatorItem}>
                <i
                  className="fas fa-triangle-exclamation"
                  style={{ color: '#ff9f43' }}
                />
                <span>FGM</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
