import { CountryData } from '../types';
import MetricRow from './MetricRow';
import IndicatorSection from './IndicatorSection';
import { rankBasedColorScale } from '../utils/color';
import { getFullLabel } from '../utils/score';
import styles from './InfoPanel.module.css';

export function InfoPanel({
  countryName,
  country,
  onClose,
}: {
  countryName: string;
  country: CountryData;
  onClose: () => void;
}) {
  const rank = country?.kri_rank ?? null;
  const color = rank ? rankBasedColorScale(rank) : '#FEFEFE';
  return (
    <div className={styles.panel}>
      <button onClick={onClose} className={styles.closeButton}>
        ✖
      </button>
      <h4 className={styles.title}>{countryName}</h4>
      <div className={styles.metricsGrid}>
        <div className={styles.kriRow} style={{ background: color }}>
          <div className={styles.badge}>
            <i className={`fa fa-star ${styles.kriIcon}`} />
            <strong className={styles.kriLabel}>KRI</strong>
            <span className={styles.kriValue}>
              {country?.kri_score ? country.kri_score.toFixed(3) : 'N/A'}
            </span>
            <span className={styles.kriDivider}>|</span>
            <strong className={styles.kriLabel}>Rank</strong>
            <span className={styles.kriValue}>{country?.kri_rank} / 194</span>
          </div>
          <div
            className={styles.performanceBadge}
            style={{
              backgroundColor: country.kri_rank
                ? rankBasedColorScale(country.kri_rank)
                : '#FEFEFE',
              color: country.kri_rank ? '#fff' : '#000',
            }}
          >
            {getFullLabel(country.kri_rank ?? null, 194)}
          </div>
        </div>
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
      {country?.indicators && country.indicators.length > 0 && (
        <>
          <div className={styles.subtitle}>Indicators</div>
          <IndicatorSection indicators={country.indicators} rank={rank} />
        </>
      )}
    </div>
  );
}
