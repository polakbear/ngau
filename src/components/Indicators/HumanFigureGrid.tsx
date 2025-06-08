import styles from './IndicatorMetrics.module.css';

interface HumanFigureGridProps {
  percentage: number;
  total?: number;
  gender: 'female' | 'male';
}

export default function HumanFigureGrid({
  percentage,
  total = 100,
  gender,
}: HumanFigureGridProps) {
  const filledCount = Math.round((percentage / 100) * total);
  const figures = [];

  for (let i = 0; i < total; i++) {
    figures.push(
      <i
        key={i}
        className={`fas fa-${gender} ${styles.figure} ${
          i < filledCount ? styles.figureFilled : styles.figureEmpty
        }`}
      />
    );
  }

  return (
    <div className={styles.figureGrid} data-total={total}>
      {figures}
    </div>
  );
}
