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
          <i
            className="fa fa-list"
            aria-hidden="true"
            style={{ fontSize: '20px' }}
          />
          <span style={{ padding: '0 8px' }}>KRI</span>
          {submenuOpen ? (
            <i
              className="fa fa-chevron-up"
              aria-hidden="true"
              style={{ fontSize: '12px', opacity: 0.6 }}
            />
          ) : (
            <i
              className="fa fa-chevron-down"
              aria-hidden="true"
              style={{ fontSize: '12px', opacity: 0.6 }}
            />
          )}
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
