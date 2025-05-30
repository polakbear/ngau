import { CountryData } from '../types';
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
  const rank = country?.kri_rank ?? null;

  if (!country || rank === null) {
    return (
      <div className={styles.tooltip}>
        {closeButton && (
          <div className={styles.closeButton}>
            <button onClick={onClose} className="pinned-icon" title="Pinned">
              <i className="fas fa-thumbtack" />
            </button>
          </div>
        )}

        <div className={styles.header}>{countryName}</div>
        <div className={styles.noDataContainer}>
          <div>
            <i className={`fas fa-info-circle ${styles.noDataIcon}`}></i>
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

      <div className={styles.badgesRow}></div>

      <div className={styles.metricsGrid}>
        {' '}
        <MetricRow
          iconClass="fa fa-seedling"
          label="Life"
          value={country?.life}
          rank={country?.ranking_life}
          hideGradientAndRank
        />
        <MetricRow
          iconClass="fa fa-heart"
          label="Health"
          value={country?.health}
          rank={country?.ranking_health}
          hideGradientAndRank
        />
        <MetricRow
          iconClass="fa fa-graduation-cap"
          label="Education"
          value={country?.education}
          rank={country?.ranking_education}
          hideGradientAndRank
        />
        <MetricRow
          iconClass="fa fa-shield-alt"
          label="Protection"
          value={country?.protection}
          rank={country?.ranking_protection}
          hideGradientAndRank
        />
        <MetricRow
          iconClass="fa fa-globe"
          label="Empowerment"
          value={country?.environment}
          rank={country?.ranking_environment}
          hideGradientAndRank
        />
      </div>

      {/* Indicator Icons */}
      {country.indicators && country.indicators.length > 0 && (
        <div className={styles.indicatorIcons}>
          <div className={styles.indicatorList}>
            {country.indicators.some(
              (i) =>
                i.indicator_type === 'female_child_marriage' ||
                i.indicator_type === 'male_child_marriage'
            ) && (
              <div className={styles.indicatorItem}>
                <i className="fas fa-ring" />
                <span>Child Marriage</span>
              </div>
            )}
            {country.indicators.some(
              (i) => i.indicator_type === 'violent_discipline'
            ) && (
              <div className={styles.indicatorItem}>
                <i className="fas fa-hand" />
                <span>Violent Discipline</span>
              </div>
            )}
            {country.indicators.some((i) => i.indicator_type === 'fgm') && (
              <div className={styles.indicatorItem}>
                <i className="fas fa-triangle-exclamation" />
                <span>FGM</span>
              </div>
            )}
          </div>
        </div>
      )}
      <div className={styles.indicatorFooter}>
        <div className={styles.indicatorLabel}>
          Click to explore more details
        </div>
      </div>
    </div>
  );
}
