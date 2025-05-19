import { useEffect, useRef, useState } from 'react';
import useScoreType from '../hooks/useScoreType';

import styles from './ScoreTabs.module.css';
import { ScoreType } from '../types';

export function ScoreTabs() {
  const { scoreType, setScoreType, setActiveTabPosition } = useScoreType();
  const containerRef = useRef<HTMLDivElement>(null);
  const activeTabRef = useRef<HTMLButtonElement>(null);
  const [canScroll, setCanScroll] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Define the tabs configuration
  const tabs = [
    { type: 'overall', icon: 'fa-star', label: 'Overall' },
    { type: 'ranking_life', icon: 'fa-seedling', label: 'Life' },
    { type: 'ranking_health', icon: 'fa-heart', label: 'Health' },
    {
      type: 'ranking_education',
      icon: 'fa-graduation-cap',
      label: 'Education',
    },
    { type: 'ranking_protection', icon: 'fa-shield-alt', label: 'Protection' },
    { type: 'ranking_environment', icon: 'fa-globe', label: 'Empowerment' },
  ];

  // Update active tab position when it changes
  useEffect(() => {
    const activeTab = document.querySelector(
      `[data-score-type="${scoreType}"]`
    );
    if (activeTab) {
      const rect = activeTab.getBoundingClientRect();
      setActiveTabPosition({ left: rect.left, width: rect.width });
    }
  }, [scoreType, setActiveTabPosition]);

  useEffect(() => {
    const checkScroll = () => {
      const container = containerRef.current;
      if (container) {
        const hasLeftScroll = container.scrollLeft > 0;
        const hasRightScroll =
          container.scrollLeft < container.scrollWidth - container.clientWidth;
        setCanScroll(hasLeftScroll);
        setCanScrollRight(hasRightScroll);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScroll);
      window.addEventListener('resize', checkScroll);
      checkScroll();
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', checkScroll);
        window.removeEventListener('resize', checkScroll);
      }
    };
  }, []);

  return (
    <div
      className={styles.container}
      ref={containerRef}
      data-can-scroll={canScroll}
      data-can-scroll-right={canScrollRight}
    >
      <div className={styles.tabsContainer}>
        {tabs.map((tab) => (
          <div key={tab.type} className={styles.tabWrapper}>
            <button
              ref={scoreType === tab.type ? activeTabRef : null}
              className={`${styles.tab} ${scoreType === tab.type ? styles.active : ''}`}
              onClick={() => setScoreType(tab.type as ScoreType)}
              data-score-type={tab.type}
            >
              <i className={`fa ${tab.icon}`} aria-hidden="true" />
              <span className={styles.tabLabel}>{tab.label}</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
