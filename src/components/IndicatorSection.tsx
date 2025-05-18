import { IndicatorEntry } from '../types';
import ProgressBar from './ProgressBar';
import styles from './IndicatorSection.module.css';

interface IndicatorSectionProps {
  indicators: IndicatorEntry[] | undefined;
}

export default function IndicatorSection({
  indicators,
}: IndicatorSectionProps) {
  if (!indicators || indicators.length === 0) return null;

  //  extract indicator values
  const find = (type: string) =>
    indicators.find((i) => i.indicator_type === type);

  const femaleChildMarriage = find('female_child_marriage');
  const maleChildMarriage = find('male_child_marriage');
  const violentDiscipline = find('violent_discipline');
  const fgm = find('fgm');

  return (
    <div className={styles.container}>
      {(femaleChildMarriage || maleChildMarriage) && (
        <div className={styles.section}>
          <div className={styles.title}>
            <i className="fas fa-ring"></i> Child Marriage
          </div>
          <div className={styles.childMarriageGrid}>
            {/* Female Column */}
            <div className={styles.childMarriageColumn}>
              <div className={styles.childMarriageTitle}>
                <i className="fas fa-venus" style={{ color: '#ff9f43' }}></i>{' '}
                Female
              </div>
              {femaleChildMarriage?.value_female_15 ? (
                <ProgressBar
                  label={
                    <>
                      <i
                        className="fas fa-child"
                        style={{
                          fontSize: 10,
                          marginRight: 4,
                          color: '#ff9f43',
                        }}
                      />
                      By age 15
                    </>
                  }
                  value={femaleChildMarriage.value_female_15}
                />
              ) : (
                <div className={styles.item}>
                  <div className={styles.label}>
                    <i
                      className="fas fa-exclamation-circle"
                      style={{
                        fontSize: 10,
                        marginRight: 4,
                        opacity: 0.7,
                        color: '#ff9f43',
                      }}
                    />
                    No data available
                  </div>
                </div>
              )}
              {femaleChildMarriage?.value_female_18 ? (
                <ProgressBar
                  label={
                    <>
                      <i
                        className="fas fa-female"
                        style={{
                          fontSize: 10,
                          marginRight: 4,
                          color: '#ff9f43',
                        }}
                      />
                      By age 18
                    </>
                  }
                  value={femaleChildMarriage.value_female_18}
                />
              ) : null}
            </div>
            {/* Male Column */}
            <div className={styles.childMarriageColumn}>
              <div className={styles.childMarriageTitle}>
                <i className="fas fa-mars" style={{ color: '#ff9f43' }}></i>{' '}
                Male
              </div>
              {maleChildMarriage?.value_male_18 ? (
                <ProgressBar
                  label={
                    <>
                      <i
                        className="fas fa-male"
                        style={{
                          fontSize: 10,
                          marginRight: 4,
                          color: '#ff9f43',
                        }}
                      />
                      By age 18
                    </>
                  }
                  value={maleChildMarriage.value_male_18}
                />
              ) : (
                <div className={styles.item}>
                  <div className={styles.label}>
                    <i
                      className="fas fa-exclamation-circle"
                      style={{
                        fontSize: 10,
                        marginRight: 4,
                        opacity: 0.7,
                        color: '#ff9f43',
                      }}
                    />
                    No data available
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {violentDiscipline && (
        <div className={styles.section}>
          <div className={styles.title}>
            <i className="fas fa-hand"></i> Violent Discipline
          </div>
          <div className={styles.content}>
            {violentDiscipline.value_total != null && (
              <ProgressBar
                label="Total"
                value={violentDiscipline.value_total}
              />
            )}
            {violentDiscipline.value_male != null && (
              <ProgressBar label="Male" value={violentDiscipline.value_male} />
            )}
            {violentDiscipline.value_female != null && (
              <ProgressBar
                label="Female"
                value={violentDiscipline.value_female}
              />
            )}
            <div className={styles.source}>
              Source: {violentDiscipline.data_source || 'Not specified'} (
              {violentDiscipline.year || 'Year not specified'})
            </div>
          </div>
        </div>
      )}

      {fgm && (
        <div className={styles.section}>
          <div className={styles.title}>
            <i className="fas fa-triangle-exclamation"></i> Female Genital
            Mutilation
          </div>
          <div className={styles.content}>
            {fgm.value_girls_0_14 != null && (
              <ProgressBar
                label="Girls aged 0-14"
                value={fgm.value_girls_0_14}
              />
            )}
            {fgm.value_urban != null && (
              <ProgressBar label="Urban" value={fgm.value_urban} />
            )}
            {fgm.value_rural != null && (
              <ProgressBar label="Rural" value={fgm.value_rural} />
            )}
            <div className={styles.source}>
              Source: {fgm.data_source || 'Not specified'} (
              {fgm.year || 'Year not specified'})
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
