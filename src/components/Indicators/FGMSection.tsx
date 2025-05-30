import { IndicatorEntry } from '../../types';
import ProgressBar from '../ProgressBar';
import styles from './IndicatorSection.module.css';
import iconStyles from './Indicators.module.css';

interface FGMSectionProps {
  fgm: IndicatorEntry;
  borderColor: string;
}

export default function FGMSection({ fgm, borderColor }: FGMSectionProps) {
  if (!fgm) return null;

  return (
    <div className={styles.section} style={{ borderLeftColor: borderColor }}>
      <div className={styles.title}>
        <i className="fas fa-triangle-exclamation"></i> Female Genital
        Mutilation
      </div>
      <div className={styles.content}>
        {fgm.value_girls_0_14 != null && (
          <div className={styles.fgmTotal}>
            <ProgressBar label="Girls aged 0-14" value={fgm.value_girls_0_14} />
          </div>
        )}
        <div className={styles.twoColumnGrid}>
          {fgm.value_urban != null && (
            <ProgressBar
              label={
                <>
                  <i className={`fas fa-city ${iconStyles.icon}`} />
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
                  <i className={`fas fa-tree ${iconStyles.icon}`} />
                  Rural
                </>
              }
              value={fgm.value_rural}
            />
          )}
        </div>
        <div className={styles.source}>
          Source: {fgm.data_source || 'Not specified'} (
          {fgm.year || 'Year not specified'})
        </div>
      </div>
    </div>
  );
}
