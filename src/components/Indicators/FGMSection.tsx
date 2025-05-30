import { IndicatorEntry } from '../../types';
import ProgressBar from '../ProgressBar';
import indicatorStyles from './IndicatorSection.module.css';
import styles from './FGMSection.module.css';

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
        <i className="fas fa-triangle-exclamation"></i> Female Genital
        Mutilation
      </div>
      <div className={indicatorStyles.content}>
        {fgm.value_girls_0_14 != null && (
          <div className={styles.fgmTotal}>
            <ProgressBar label="Girls aged 0-14" value={fgm.value_girls_0_14} />
          </div>
        )}
        <div className={indicatorStyles.twoColumnGrid}>
          {fgm.value_urban != null && (
            <ProgressBar
              label={
                <>
                  <i className={`fas fa-city ${indicatorStyles.icon}`} />
                  Urban
                </>
              }
              value={fgm.value_urban}
            />
          )}
          {fgm.value_rural != null && (
            <ProgressBar
              label={
                <>
                  <i className={`fas fa-tree ${indicatorStyles.icon}`} />
                  Rural
                </>
              }
              value={fgm.value_rural}
            />
          )}
        </div>
        <div className={indicatorStyles.source}>
          Source: {fgm.data_source || 'Not specified'} (
          {fgm.year || 'Year not specified'})
        </div>
      </div>
    </div>
  );
}
