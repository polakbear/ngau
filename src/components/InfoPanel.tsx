import { CountryData } from '../types';
import MetricRow from './MetricRow';
import IndicatorSection from './IndicatorSection';
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
  return (
    <div className={styles.panel}>
      <button onClick={onClose} className={styles.closeButton}>
        ✖
      </button>
      <h4 className={styles.title}>{countryName}</h4>
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
      {country?.indicators && country.indicators.length > 0 && (
        <>
          <div className={styles.subtitle}>Indicators</div>
          <IndicatorSection indicators={country.indicators} />
        </>
      )}
    </div>
  );
}
