import { IndicatorEntry } from '../../types';
import ProgressBar from '../ProgressBar';
import styles from './IndicatorSection.module.css';
import iconStyles from './Indicators.module.css';

interface ViolentDisciplineSectionProps {
  violentDiscipline: IndicatorEntry;
  borderColor: string;
}

export default function ViolentDisciplineSection({
  violentDiscipline,
  borderColor,
}: ViolentDisciplineSectionProps) {
  if (!violentDiscipline) return null;

  return (
    <div className={styles.section} style={{ borderLeftColor: borderColor }}>
      <div className={styles.title}>
        <i className="fas fa-hand"></i> Violent Discipline
      </div>
      <div className={styles.content}>
        {violentDiscipline.value_total != null && (
          <div className={styles.fullWidth}>
            <ProgressBar
              label={
                <>
                  <i className={`fas fa-chart-bar ${iconStyles.icon}`} />
                  Total
                </>
              }
              value={violentDiscipline.value_total}
            />
          </div>
        )}
        <div className={styles.twoColumnGrid}>
          {violentDiscipline.value_male != null && (
            <ProgressBar
              label={
                <>
                  <i className={`fas fa-mars ${iconStyles.icon}`} />
                  Male
                </>
              }
              value={violentDiscipline.value_male}
            />
          )}
          {violentDiscipline.value_female != null && (
            <ProgressBar
              label={
                <>
                  <i className={`fas fa-venus ${iconStyles.icon}`} />
                  Female
                </>
              }
              value={violentDiscipline.value_female}
            />
          )}
        </div>
        <div className={styles.source}>
          Source: {violentDiscipline.data_source || 'Not specified'} (
          {violentDiscipline.year || 'Year not specified'})
        </div>
      </div>
    </div>
  );
}
