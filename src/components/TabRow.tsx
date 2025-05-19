import { ScoreTabs } from './ScoreTabs';
import styles from './TabRow.module.css';

export function TabRow() {
  return (
    <div className={styles.container}>
      <ScoreTabs />
    </div>
  );
}
