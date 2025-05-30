import { IndicatorEntry } from '../../types';
import ProgressBar from '../ProgressBar';
import NoDataMessage from './NoDataMessage';
import styles from './ChildMarriageSection.module.css';
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
    <div className={styles.section} style={{ borderLeftColor: borderColor }}>
      <div className={indicatorStyles.title}>
        <i className="fas fa-ring"></i> Child Marriage
      </div>
      <div className={styles.childMarriageGrid}>
        {/* Female Column */}
        <div className={styles.childMarriageColumn}>
          <div className={styles.childMarriageTitle}>
            <i className={`fas fa-venus ${indicatorStyles.genderIcon}`} />{' '}
            Female
          </div>
          {(!femaleChildMarriage?.value_female_15 &&
            !femaleChildMarriage?.value_female_18) ||
          ((femaleChildMarriage?.value_female_15 === 0 ||
            femaleChildMarriage?.value_female_15 == null) &&
            (femaleChildMarriage?.value_female_18 === 0 ||
              femaleChildMarriage?.value_female_18 == null)) ? (
            <NoDataMessage />
          ) : (
            <>
              {(femaleChildMarriage?.value_female_15 ?? 0) > 0 && (
                <ProgressBar
                  label={
                    <>
                      <i className={`fas fa-child ${indicatorStyles.icon}`} />
                      By age 15
                    </>
                  }
                  value={femaleChildMarriage!.value_female_15!}
                />
              )}
              {(femaleChildMarriage?.value_female_18 ?? 0) > 0 && (
                <ProgressBar
                  label={
                    <>
                      <i className={`fas fa-female ${indicatorStyles.icon}`} />
                      By age 18
                    </>
                  }
                  value={femaleChildMarriage!.value_female_18!}
                />
              )}
            </>
          )}
        </div>
        {/* Male Column */}
        <div className={styles.childMarriageColumn}>
          <div className={styles.childMarriageTitle}>
            <i className={`fas fa-mars ${indicatorStyles.genderIcon}`} /> Male
          </div>
          {!maleChildMarriage?.value_male_18 ||
          maleChildMarriage.value_male_18 === 0 ? (
            <NoDataMessage />
          ) : (
            <ProgressBar
              label={
                <>
                  <i className={`fas fa-male ${indicatorStyles.icon}`} />
                  By age 18
                </>
              }
              value={maleChildMarriage.value_male_18}
            />
          )}
        </div>
      </div>
    </div>
  );
}
