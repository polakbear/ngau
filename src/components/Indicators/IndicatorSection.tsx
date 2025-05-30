import { IndicatorEntry } from '../../types';
import { rankBasedColorScale } from '../../utils/color';
import styles from './IndicatorSection.module.css';
import ChildMarriageSection from '../Indicators/ChildMarriageSection';
import ViolentDisciplineSection from '../Indicators/ViolentDisciplineSection';
import FGMSection from '../Indicators/FGMSection';

interface IndicatorSectionProps {
  indicators: IndicatorEntry[] | undefined;
  rank: number | null;
}

export default function IndicatorSection({
  indicators,
  rank,
}: IndicatorSectionProps) {
  if (!indicators || indicators.length === 0) return null;
  const borderColor = rank
    ? rankBasedColorScale(rank)
    : 'rgba(63, 209, 199, 0.25)';

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
        <ChildMarriageSection
          femaleChildMarriage={femaleChildMarriage}
          maleChildMarriage={maleChildMarriage}
          borderColor={borderColor}
        />
      )}

      {violentDiscipline && (
        <ViolentDisciplineSection
          violentDiscipline={violentDiscipline}
          borderColor={borderColor}
        />
      )}

      {fgm && <FGMSection fgm={fgm} borderColor={borderColor} />}
    </div>
  );
}
