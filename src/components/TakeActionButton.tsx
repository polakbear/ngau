import { useState } from 'react';
import { Organizations } from './Organizations';
import styles from './TakeActionButton.module.css';

export function TakeActionButton() {
  const [isActive, setIsActive] = useState(false);

  return (
    <>
      <button
        className={`${styles.button} ${isActive ? styles.active : ''}`}
        onClick={() => setIsActive(!isActive)}
      >
        <i className="fas fa-hands-helping" /> Take Action
      </button>
      {isActive && <Organizations />}
    </>
  );
}

export default TakeActionButton;
