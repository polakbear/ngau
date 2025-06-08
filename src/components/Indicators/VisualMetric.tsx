import HumanFigureGrid from './HumanFigureGrid';
import styles from './IndicatorMetrics.module.css';
import { getAffectedCount } from '../../utils/utils';

interface VisualMetricProps {
  label: string;
  value: number;
  gender: 'female' | 'male';
  ageLabel: string;
}

export default function VisualMetric({
  value,
  gender,
  ageLabel,
}: VisualMetricProps) {
  const { total } = getAffectedCount(value);

  return (
    <div className={styles.visualMetric}>
      <div className={styles.metricHeader}>
        <span className={styles.ageLabel}>{ageLabel}</span>
        <span className={styles.percentage}>{value}%</span>
      </div>
      <HumanFigureGrid percentage={value} total={total} gender={gender} />
    </div>
  );
}
