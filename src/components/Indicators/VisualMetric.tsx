import HumanFigureGrid from './HumanFigureGrid';
import styles from './IndicatorMetrics.module.css';

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
  return (
    <div className={styles.visualMetric}>
      <div className={styles.metricHeader}>
        <span className={styles.ageLabel}>{ageLabel}</span>
        <span className={styles.percentage}>{value}%</span>
      </div>
      <HumanFigureGrid percentage={value} total={20} gender={gender} />
      <div className={styles.description}>
        Out of 20 {gender === 'female' ? 'girls' : 'boys'},
        {Math.round((value / 100) * 20)} married {ageLabel.toLowerCase()}
      </div>
    </div>
  );
}
