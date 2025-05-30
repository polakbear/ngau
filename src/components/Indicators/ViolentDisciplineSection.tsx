import { IndicatorEntry } from '../../types';
import ProgressBar from '../ProgressBar';
import indicatorStyles from './IndicatorSection.module.css';

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
    <div
      className={indicatorStyles.section}
      style={{ borderLeftColor: borderColor }}
    >
      <div className={indicatorStyles.title}>
        <i className="fas fa-hand"></i> Violent Discipline
      </div>
      <div className={indicatorStyles.content}>
        {violentDiscipline.value_total != null && (
          <div className={indicatorStyles.fullWidth}>
            <ProgressBar
              label={
                <>
                  <i className={`fas fa-chart-bar ${indicatorStyles.icon}`} />
                  Total
                </>
              }
              value={violentDiscipline.value_total}
            />
          </div>
        )}
        <div className={indicatorStyles.twoColumnGrid}>
          {violentDiscipline.value_male != null && (
            <ProgressBar
              label={
                <>
                  <i className={`fas fa-mars ${indicatorStyles.icon}`} />
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
                  <i className={`fas fa-venus ${indicatorStyles.icon}`} />
                  Female
                </>
              }
              value={violentDiscipline.value_female}
            />
          )}
        </div>
        <div className={indicatorStyles.source}>
          Source: {violentDiscipline.data_source || 'Not specified'} (
          {violentDiscipline.year || 'Year not specified'})
        </div>
      </div>
    </div>
  );
}
