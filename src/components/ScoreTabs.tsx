import { useEffect, useRef, useState } from 'react';
import useScoreType from '../hooks/useScoreType';
import styles from './ScoreTabs.module.css';
import { Methodology } from './Methodology';

export function ScoreTabs() {
  const { scoreType, setScoreType } = useScoreType();
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScroll, setCanScroll] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

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
        <button
          className={`${styles.tab} ${scoreType === 'overall' ? styles.active : ''}`}
          onClick={() => setScoreType('overall')}
        >
          <i className="fa fa-star" aria-hidden="true" />
          <span className={styles.tabLabel}>Overall</span>
          {scoreType === 'overall' && <Methodology />}
        </button>
        <button
          className={`${styles.tab} ${scoreType === 'ranking_life' ? styles.active : ''}`}
          onClick={() => setScoreType('ranking_life')}
        >
          <i className="fa fa-seedling" aria-hidden="true" />
          <span className={styles.tabLabel}>Life</span>
          {scoreType === 'ranking_life' && <Methodology />}
        </button>
        <button
          className={`${styles.tab} ${scoreType === 'ranking_health' ? styles.active : ''}`}
          onClick={() => setScoreType('ranking_health')}
        >
          <i className="fa fa-heart" aria-hidden="true" />
          <span className={styles.tabLabel}>Health</span>
          {scoreType === 'ranking_health' && <Methodology />}
        </button>
        <button
          className={`${styles.tab} ${scoreType === 'ranking_education' ? styles.active : ''}`}
          onClick={() => setScoreType('ranking_education')}
        >
          <i className="fa fa-graduation-cap" aria-hidden="true" />
          <span className={styles.tabLabel}>Education</span>
          {scoreType === 'ranking_education' && <Methodology />}
        </button>
        <button
          className={`${styles.tab} ${scoreType === 'ranking_protection' ? styles.active : ''}`}
          onClick={() => setScoreType('ranking_protection')}
        >
          <i className="fa fa-shield-alt" aria-hidden="true" />
          <span className={styles.tabLabel}>Protection</span>
          {scoreType === 'ranking_protection' && <Methodology />}
        </button>
        <button
          className={`${styles.tab} ${scoreType === 'ranking_environment' ? styles.active : ''}`}
          onClick={() => setScoreType('ranking_environment')}
        >
          <i className="fa fa-globe" aria-hidden="true" />
          <span className={styles.tabLabel}>Empowerment</span>
          {scoreType === 'ranking_environment' && <Methodology />}
        </button>
      </div>
    </div>
  );
}
