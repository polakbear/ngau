/* Organizations panel launched from TakeActionButton */
import { useDialog } from '../hooks/useDialog';
import styles from './Organizations.module.css';

interface OrganizationsProps {
  onClose: () => void;
}

export function Organizations({ onClose }: OrganizationsProps) {
  const dialogRef = useDialog(onClose);

  return (
    <dialog
      ref={dialogRef}
      className={styles.organizationsPanel}
      aria-labelledby="organizations-title"
    >
      <button
        onClick={onClose}
        className={styles.closeButton}
        aria-label="Close organizations panel"
      >
        ✖
      </button>
      <h2 id="organizations-title" className={styles.title}>
        Organizations
      </h2>

      <div className={styles.organizationItem}>
        <div className={styles.organizationName}>
          <i className="fa fa-globe-americas" /> UNICEF
        </div>
        <div className={styles.organizationDescription}>
          Works in over 190 countries to protect children's rights, help meet
          their basic needs, and expand opportunities for children to reach
          their full potential.
        </div>
        <a
          href="https://www.unicef.org/take-action"
          target="_blank"
          rel="noopener"
          className={styles.organizationLink}
        >
          <i className="fa fa-heart" /> Make a difference
        </a>
      </div>

      <div className={styles.organizationItem}>
        <div className={styles.organizationName}>
          <i className="fa fa-child" /> Child Fund
        </div>
        <div className={styles.organizationDescription}>
          Helping deprived, excluded and vulnerable children have the capacity
          to become young adults, parents and leaders who bring lasting and
          positive change to their communities.
        </div>
        <a
          href="https://www.childfund.org/ways-to-help/"
          target="_blank"
          rel="noopener"
          className={styles.organizationLink}
        >
          <i className="fa fa-hand-holding-heart" /> Help today
        </a>
      </div>

      <div className={styles.organizationItem}>
        <div className={styles.organizationName}>
          <i className="fa fa-star" /> Shine for Kids
        </div>
        <div className={styles.organizationDescription}>
          Supporting children, young people and families with relatives in the
          criminal justice system through various programs.
        </div>
        <a
          href="https://shineforkids.org.au/get-involved/"
          target="_blank"
          rel="noopener"
          className={styles.organizationLink}
        >
          <i className="fa fa-handshake" /> Get involved
        </a>
      </div>

      <div className={styles.organizationItem}>
        <div className={styles.organizationName}>
          <i className="fa fa-shield-alt" /> Kids Rights
        </div>
        <div className={styles.organizationDescription}>
          Advocates for children's rights worldwide and supports local
          organizations helping disadvantaged children.
        </div>
        <a
          href="https://www.kidsrights.org/support/"
          target="_blank"
          rel="noopener"
          className={styles.organizationLink}
        >
          <i className="fa fa-hands-helping" /> Take action
        </a>
      </div>
    </dialog>
  );
}
