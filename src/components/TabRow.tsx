import { ScoreTabs } from './ScoreTabs';
import { Methodology } from './Methodology';
import styles from './TabRow.module.css';

export function TabRow() {
  return (
    <div className={styles.container}>
      <Methodology />
      <ScoreTabs />
    </div>
  );
}
