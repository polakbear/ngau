import styles from './Methodology.module.css';
import useScoreType from '../hooks/useScoreType';

const methodologyContent = {
  overall: 'Combined measure of child rights implementation',
  ranking_life: 'Under-5 mortality, life expectancy, maternal mortality',
  ranking_health:
    'Underweight children, immunization, sanitation, water access',
  ranking_education: 'Schooling for girls and boys, gender gap',
  ranking_protection: 'Child labour, adolescent birth rate, birth registration',
  ranking_environment:
    'Equal treatment, child voice, funding, detailed data, cooperation with child rights groups',
  organizations: 'Organizations working to protect and support children',
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
