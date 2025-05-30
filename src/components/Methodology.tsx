import styles from './Methodology.module.css';
import useScoreType from '../hooks/useScoreType';
import useTabHover from '../hooks/useTabHover';

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

function isMetricType(type: string | null): type is MetricType {
  return (
    !!type && Object.prototype.hasOwnProperty.call(methodologyContent, type)
  );
}

export function Methodology() {
  const { scoreType } = useScoreType();
  const { hoverTab } = useTabHover();
  const activeType = hoverTab || scoreType;

  if (!isMetricType(activeType)) return null;

  return (
    <div className={styles.container} role="note" aria-live="polite">
      <div className={styles.section}>{methodologyContent[activeType]}</div>
    </div>
  );
}
