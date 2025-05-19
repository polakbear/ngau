import { CountryData } from '../types';
import MetricRow from './MetricRow';
import IndicatorSection from './IndicatorSection';
import { getContrastingTextColor, rankBasedColorScale } from '../utils/color';
import { getFullLabel } from '../utils/score';
import { useEffect, useRef } from 'react';
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
  const dialogRef = useRef<HTMLDialogElement>(null);
  const rank = country?.kri_rank ?? null;
  const color = rank ? rankBasedColorScale(rank) : '#FEFEFE';
  const bgColor = getContrastingTextColor(color);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) {
      dialog.showModal();
    }

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

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
      <div className={styles.metricsGrid}>
        <div className={styles.kriRow} style={{ background: color }}>
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
    </dialog>
  );
}
