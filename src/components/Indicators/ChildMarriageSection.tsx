import { IndicatorEntry } from '../../types';
import NoDataMessage from './NoDataMessage';
import VisualMetric from './VisualMetric';
import styles from './IndicatorMetrics.module.css';
import indicatorStyles from './IndicatorSection.module.css';

interface ChildMarriageSectionProps {
  femaleChildMarriage: IndicatorEntry | undefined;
  maleChildMarriage: IndicatorEntry | undefined;
  borderColor: string;
}

export default function ChildMarriageSection({
  femaleChildMarriage,
  maleChildMarriage,
  borderColor,
}: ChildMarriageSectionProps) {
  if (!femaleChildMarriage && !maleChildMarriage) return null;

  return (
    <div
      className={indicatorStyles.section}
      style={{ borderLeftColor: borderColor }}
    >
      <div className={indicatorStyles.title}>
        <i className="fas fa-ring"></i> Child Marriage
      </div>

      <div className={styles.metricsFlow}>
        {/* Female Age 15 - Always show if > 0 */}
        {(femaleChildMarriage?.value_female_15 ?? 0) > 0 && (
          <div className={styles.metricCard}>
            <div className={styles.metricHeader}>
              <div></div>
              <div className={styles.genderLabelGroup}>
                <i className={`fas fa-venus ${indicatorStyles.genderIcon}`} />
                <span className={styles.genderLabel}>Female</span>
              </div>
            </div>
            <VisualMetric
              label="By age 15"
              value={femaleChildMarriage!.value_female_15!}
              gender="female"
              ageLabel="By age 15"
            />
          </div>
        )}

        {/* Female Age 18 - Show visual if >= 5%, minimal if 1-4% */}
        {(femaleChildMarriage?.value_female_18 ?? 0) >= 5 ? (
          <div className={styles.metricCard}>
            <div className={styles.metricHeader}>
              <div></div>
              <div className={styles.genderLabelGroup}>
                <i className={`fas fa-venus ${indicatorStyles.genderIcon}`} />
                <span className={styles.genderLabel}>Female</span>
              </div>
            </div>
            <VisualMetric
              label="By age 18"
              value={femaleChildMarriage!.value_female_18!}
              gender="female"
              ageLabel="By age 18"
            />
          </div>
        ) : (femaleChildMarriage?.value_female_18 ?? 0) > 0 ? (
          <div className={styles.minimalMetric}>
            <div className={styles.minimalMetricHeader}>
              <i className={`fas fa-venus ${indicatorStyles.genderIcon}`} />
              <span className={styles.genderLabel}>Female</span>
            </div>
            <div className={styles.lowImpactMessage}>
              <i
                className="fas fa-info-circle"
                style={{ fontSize: '9px', marginRight: '4px', opacity: 0.7 }}
              />
              Before 18: {femaleChildMarriage!.value_female_18}% (minimal)
            </div>
          </div>
        ) : null}

        {/* Male Age 18 - Show visual if >= 5%, minimal if 1-4% */}
        {maleChildMarriage?.value_male_18 &&
        maleChildMarriage.value_male_18 >= 5 ? (
          <div className={styles.metricCard}>
            <div className={styles.metricHeader}>
              <div></div>
              <div className={styles.genderLabelGroup}>
                <i className={`fas fa-mars ${indicatorStyles.genderIcon}`} />
                <span className={styles.genderLabel}>Male</span>
              </div>
            </div>
            <VisualMetric
              label="By age 18"
              value={maleChildMarriage.value_male_18}
              gender="male"
              ageLabel="By age 18"
            />
          </div>
        ) : maleChildMarriage?.value_male_18 &&
          maleChildMarriage.value_male_18 > 0 ? (
          <div className={styles.minimalMetric}>
            <div className={styles.minimalMetricHeader}>
              <i className={`fas fa-mars ${indicatorStyles.genderIcon}`} />
              <span className={styles.genderLabel}>Male</span>
            </div>
            <div className={styles.lowImpactMessage}>
              <i
                className="fas fa-info-circle"
                style={{ fontSize: '9px', marginRight: '4px', opacity: 0.7 }}
              />
              Before 18: {maleChildMarriage.value_male_18}% (minimal)
            </div>
          </div>
        ) : null}

        {/* No data message if nothing to show */}
        {!femaleChildMarriage?.value_female_15 &&
          !femaleChildMarriage?.value_female_18 &&
          !maleChildMarriage?.value_male_18 && <NoDataMessage />}
      </div>

      {(femaleChildMarriage?.data_source || maleChildMarriage?.data_source) && (
        <div className={styles.source}>
          Source:{' '}
          {femaleChildMarriage?.data_source || maleChildMarriage?.data_source} (
          {femaleChildMarriage?.year ||
            maleChildMarriage?.year ||
            'Year not specified'}
          )
        </div>
      )}
    </div>
  );
}
