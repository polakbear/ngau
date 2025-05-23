import { ScoreTabs } from './ScoreTabs';
import styles from './TabRow.module.css';

import { useState } from 'react';

export function TabRow() {
  const [submenuOpen, setSubmenuOpen] = useState(false);
  return (
    <div className={styles.container}>
      <div className={styles.kriTabWrapper}>
        <button
          className={styles.kriTab}
          tabIndex={0}
          aria-expanded={submenuOpen}
          aria-controls="kri-submenu"
          onClick={() => setSubmenuOpen((open) => !open)}
          style={{ alignSelf: 'center' }}
        >
          <i className="fa fa-chart-bar" aria-hidden="true" />
          <span>KRI</span>
        </button>
        {submenuOpen && (
          <div id="kri-submenu" className={styles.submenu}>
            <ScoreTabs />
          </div>
        )}
      </div>
    </div>
  );
}
