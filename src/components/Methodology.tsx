import styles from './Methodology.module.css';
import useScoreType from '../hooks/useScoreType';

const methodologyContent = {
  overall: 'Combined measure of child rights implementation',
  life: 'Under-5 mortality, life expectancy, maternal mortality',
  health: 'Underweight children, immunization, sanitation, water access',
  education: 'Schooling for girls and boys, gender gap',
  protection: 'Child labour, adolescent birth rate, birth registration',
  environment: 'Environmental sustainability and climate action metrics',
} as const;

type MetricType = keyof typeof methodologyContent;

export function Methodology() {
  const { scoreType } = useScoreType();
  const validType = scoreType as MetricType;

  if (!methodologyContent[validType]) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.section}>{methodologyContent[validType]}</div>
    </div>
  );
}
