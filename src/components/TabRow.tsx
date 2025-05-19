import { useEffect, useRef } from 'react';
import { ScoreTabs } from './ScoreTabs';
import { Methodology } from './Methodology';
import styles from './TabRow.module.css';

export function TabRow() {
  const activeTabRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (activeTabRef.current) {
      const rect = activeTabRef.current.getBoundingClientRect();
      const left = rect.left + rect.width / 2;
      document.documentElement.style.setProperty('--tooltip-left', `${left}px`);
    }
  }, []);

  return (
    <div className={styles.container}>
      <ScoreTabs />
      <Methodology />
    </div>
  );
}
