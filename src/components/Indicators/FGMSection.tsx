import { IndicatorEntry } from '../../types';
import indicatorStyles from './IndicatorSection.module.css';
import styles from './IndicatorMetrics.module.css';
import VisualMetric from './VisualMetric';
import { getAffectedCount } from '../../utils/utils';

interface FGMSectionProps {
  fgm: IndicatorEntry;
  borderColor: string;
}

export default function FGMSection({ fgm, borderColor }: FGMSectionProps) {
  if (!fgm) return null;

  return (
    <div
      className={indicatorStyles.section}
      style={{ borderLeftColor: borderColor }}
    >
      <div className={indicatorStyles.title}>
        <i className="fas fa-exclamation-triangle"></i> Female Genital
        Mutilation
      </div>

      <div className={styles.metricsFlow}>
        {fgm.value_girls_0_14 != null && fgm.value_girls_0_14 > 0 && (
          <div className={styles.metricCard}>
            <div className={styles.metricHeader}>
              <div></div>
              <div className={styles.genderLabelGroup}>
                <i className={`fas fa-venus ${indicatorStyles.genderIcon}`} />
                <span className={styles.genderLabel}>Girls aged 0-14</span>
              </div>
            </div>
            <VisualMetric
              label=""
              value={fgm.value_girls_0_14}
              gender="female"
              ageLabel=""
            />
            <div className={styles.description}>
              {(() => {
                const { total, affected } = getAffectedCount(
                  fgm.value_girls_0_14
                );
                return `Out of ${total} girls, ${affected} affected by FGM`;
              })()}
            </div>
          </div>
        )}

        {/* Geographic breakdown using same minimal metric style */}
        {(fgm.value_urban != null || fgm.value_rural != null) && (
          <div className={styles.minimalMetric}>
            <div className={styles.minimalMetricHeader}>
              <span className={styles.genderLabel}>
                Geographic Distribution
              </span>
            </div>
            <div
              style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}
            >
              {fgm.value_rural != null && (
                <div className={styles.lowImpactMessage}>
                  <i
                    className="fas fa-tree"
                    style={{
                      fontSize: '9px',
                      marginRight: '6px',
                      opacity: 0.7,
                    }}
                  />
                  Rural: {fgm.value_rural}%
                </div>
              )}
              {fgm.value_urban != null && (
                <div className={styles.lowImpactMessage}>
                  <i
                    className="fas fa-city"
                    style={{
                      fontSize: '9px',
                      marginRight: '6px',
                      opacity: 0.7,
                    }}
                  />
                  Urban: {fgm.value_urban}%
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className={styles.source}>
        Source: {fgm.data_source || 'Not specified'} (
        {fgm.year || 'Year not specified'})
      </div>
    </div>
  );
}
