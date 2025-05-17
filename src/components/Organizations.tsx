import { useState } from 'react';

export function Organizations() {
  const [showPanel, setShowPanel] = useState(false);

  return (
    <>
      <button
        className={`take-action-tab ${showPanel ? 'active' : ''}`}
        onClick={() => setShowPanel(!showPanel)}
      >
        Take Action
      </button>

      <div className={`organizations-panel ${showPanel ? 'active' : ''}`}>
        <div className="organization-item">
          <div className="organization-name">UNICEF</div>
          <div className="organization-description">
            Works in over 190 countries to protect children's rights, help meet
            their basic needs, and expand opportunities for children to reach
            their full potential.
          </div>
          <a
            href="https://www.unicef.org/take-action"
            target="_blank"
            rel="noopener"
            className="organization-link"
          >
            Make a difference
          </a>
        </div>

        <div className="organization-item">
          <div className="organization-name">Child Fund</div>
          <div className="organization-description">
            Helping deprived, excluded and vulnerable children have the capacity
            to become young adults, parents and leaders who bring lasting and
            positive change to their communities.
          </div>
          <a
            href="https://www.childfund.org/ways-to-help/"
            target="_blank"
            rel="noopener"
            className="organization-link"
          >
            Help today
          </a>
        </div>

        <div className="organization-item">
          <div className="organization-name">Shine for Kids</div>
          <div className="organization-description">
            Supporting children, young people and families with relatives in the
            criminal justice system through various programs.
          </div>
          <a
            href="https://shineforkids.org.au/get-involved/"
            target="_blank"
            rel="noopener"
            className="organization-link"
          >
            Get involved
          </a>
        </div>

        <div className="organization-item">
          <div className="organization-name">Kids Rights</div>
          <div className="organization-description">
            Advocates for children's rights worldwide and supports local
            organizations helping disadvantaged children.
          </div>
          <a
            href="https://www.kidsrights.org/support/"
            target="_blank"
            rel="noopener"
            className="organization-link"
          >
            Take action
          </a>
        </div>
      </div>
    </>
  );
}
