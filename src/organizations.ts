export function createOrganizationsPanel(): HTMLElement {
  const panel = document.createElement('div');
  panel.className = 'organizations-panel';
  panel.id = 'organizations-panel';

  panel.innerHTML = `
    <div class="organization-item">
      <div class="organization-name">UNICEF</div>
      <div class="organization-description">
        Works in over 190 countries to protect children's rights, help meet their basic needs, and expand opportunities for children to reach their full potential.
      </div>
      <a href="https://www.unicef.org/take-action" target="_blank" rel="noopener" class="organization-link">Make a difference</a>
    </div>

    <div class="organization-item">
      <div class="organization-name">Child Fund</div>
      <div class="organization-description">
        Helping deprived, excluded and vulnerable children have the capacity to become young adults, parents and leaders who bring lasting and positive change to their communities.
      </div>
      <a href="https://www.childfund.org/ways-to-help/" target="_blank" rel="noopener" class="organization-link">Help today</a>
    </div>

    <div class="organization-item">
      <div class="organization-name">Shine for Kids</div>
      <div class="organization-description">
        Supporting children, young people and families with relatives in the criminal justice system through various programs.
      </div>
      <a href="https://shineforkids.org.au/get-involved/" target="_blank" rel="noopener" class="organization-link">Get involved</a>
    </div>

    <div class="organization-item">
      <div class="organization-name">Kids Rights</div>
      <div class="organization-description">
        Advocates for children's rights worldwide and supports local organizations helping disadvantaged children.
      </div>
      <a href="https://kidsrights.org/get-involved/" target="_blank" rel="noopener" class="organization-link">Take action</a>
    </div>
  `;

  return panel;
}

export function createTakeActionTab(): HTMLElement {
  const button = document.createElement('button');
  button.className = 'take-action-tab';
  button.id = 'take-action-tab';
  button.textContent = 'Take Action';

  return button;
}
