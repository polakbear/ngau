import { IndicatorEntry } from '../../types';
import ProgressBar from '../ProgressBar';
import NoDataMessage from './NoDataMessage';
import styles from './IndicatorSection.module.css';
import iconStyles from './Indicators.module.css';

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
      <div className={styles.title}>
        <i className="fas fa-ring"></i> Child Marriage
      </div>
      <div className={styles.childMarriageGrid}>
        {/* Female Column */}
        <div className={styles.childMarriageColumn}>
          <div className={styles.childMarriageTitle}>
            <i className={`fas fa-venus ${iconStyles.genderIcon}`} /> Female
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
                      <i className={`fas fa-child ${iconStyles.icon}`} />
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
                      <i className={`fas fa-female ${iconStyles.icon}`} />
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
            <i className={`fas fa-mars ${iconStyles.genderIcon}`} /> Male
          </div>
          {!maleChildMarriage?.value_male_18 ||
          maleChildMarriage.value_male_18 === 0 ? (
            <NoDataMessage />
          ) : (
            <ProgressBar
              label={
                <>
                  <i className={`fas fa-male ${iconStyles.icon}`} />
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
