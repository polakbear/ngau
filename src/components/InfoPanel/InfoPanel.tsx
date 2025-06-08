import { useDialog } from '../../hooks/useDialog';
import { CountryData } from '../../types';
import {
  rankBasedColorScale,
  getContrastingTextColor,
} from '../../utils/color';
import { getFullLabel } from '../../utils/score';
import IndicatorSection from '../Indicators/IndicatorSection';
import RadarChartComponent from '../Indicators/RadarChartComponent';
import MetricRow from '../MetricRow';
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
  const dialogRef = useDialog(onClose);
  const rank = country?.kri_rank ?? null;
  const color = rank ? rankBasedColorScale(rank) : '#FEFEFE';
  const bgColor = getContrastingTextColor(color);

  if (!country || rank === null) {
    return (
      <dialog
        ref={dialogRef}
        className={styles.panel}
        aria-labelledby="country-name"
      >
        <button
          onClick={onClose}
          className={styles.closeButton}
          aria-label="Close panel"
        >
          ✖
        </button>

        <div id="country-name" className={styles.header}>
          {countryName}
        </div>
        <div className={styles.noDataContainer}>
          <div>
            <i
              className="fas fa-info-circle"
              style={{ marginRight: '8px', opacity: 0.6 }}
              aria-hidden="true"
            ></i>
            No data provided
          </div>
        </div>
      </dialog>
    );
  }

  return (
    <dialog
      ref={dialogRef}
      className={styles.panel}
      aria-labelledby="country-title"
    >
      <button
        onClick={onClose}
        className={styles.closeButton}
        aria-label="Close panel"
      >
        ✖
      </button>
      <h4 id="country-title" className={styles.title}>
        {countryName}
      </h4>
      {/* Radar/Spider Chart for main categories */}
      <RadarChartComponent
        data={{
          life: country?.ranking_life,
          health: country?.ranking_health,
          education: country?.ranking_education,
          protection: country?.ranking_protection,
          empowerment: country?.ranking_environment,
        }}
        overallRank={rank}
      />
      <div className={styles.metricsGrid}>
        <div
          className={styles.kriRow}
          style={
            {
              '--border-color': color,
            } as React.CSSProperties
          }
        >
          <div className={styles.badge}>
            <i className={`fa fa-star ${styles.kriIcon}`} aria-hidden="true" />
            <strong className={styles.kriLabel}>KRI Rank</strong>
            <span className={styles.kriValue}>{country?.kri_rank} / 194</span>
          </div>
          <div
            className={styles.performanceBadge}
            style={{
              backgroundColor: color,
              color: bgColor,
            }}
          >
            {getFullLabel(country.kri_rank ?? null, 194)}
          </div>
        </div>
        <div className={styles.kriDescription}>
          Kids Rights Index measures children's rights realization across 194
          countries.
          <br />
          Lower rank numbers indicate better performance for children's
          wellbeing.
        </div>
      </div>
      {country?.indicators && country.indicators.length > 0 && (
        <>
          <div className={styles.subtitle}>Indicators</div>
          <IndicatorSection indicators={country.indicators} rank={rank} />
        </>
      )}
    </dialog>
  );
}
