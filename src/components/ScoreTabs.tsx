import { useEffect, useRef } from 'react';
import useScoreType from '../hooks/useScoreType';
import { ScoreType } from '../types';
import styles from './ScoreTabs.module.css';

export function ScoreTabs() {
  const { scoreType, setScoreType, setActiveTabPosition } = useScoreType();
  const containerRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

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

  useEffect(() => {
    const activeTab = tabRefs.current[scoreType];
    if (activeTab && containerRef.current) {
      const updatePosition = () => {
        const containerRect = containerRef.current?.getBoundingClientRect();
        const tabRect = activeTab.getBoundingClientRect();
        if (containerRect) {
          const relativeLeft = tabRect.left - containerRect.left + 20;
          const absoluteLeft =
            relativeLeft + (containerRef.current?.scrollLeft || 0);
          setActiveTabPosition({
            left: absoluteLeft,
            width: tabRect.width,
          });
        }
      };

      updatePosition();

      const container = containerRef.current;
      const scrollHandler = () => requestAnimationFrame(updatePosition);
      const resizeHandler = () => requestAnimationFrame(updatePosition);

      container.addEventListener('scroll', scrollHandler);
      window.addEventListener('resize', resizeHandler);

      return () => {
        container.removeEventListener('scroll', scrollHandler);
        window.removeEventListener('resize', resizeHandler);
      };
    }
  }, [scoreType, setActiveTabPosition]);

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.tabsContainer}>
        {tabs.map((tab) => (
          <div key={tab.type} className={styles.tabWrapper}>
            <button
              ref={(el) => {
                tabRefs.current[tab.type] = el;
              }}
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
