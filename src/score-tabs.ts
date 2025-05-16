export function createScoreTabs(): HTMLElement {
  const container = document.createElement('div');
  container.className = 'score-tabs-container';

  container.innerHTML = `
    <button class="score-tab active" data-score="overall">Overall</button>
    <button class="score-tab" data-score="ranking_life">Life</button>
    <button class="score-tab" data-score="ranking_health">Health</button>
    <button class="score-tab" data-score="ranking_education">Education</button>
    <button class="score-tab" data-score="ranking_protection">Protection</button>
    <button class="score-tab" data-score="ranking_environment">Empowerment & Equality</button>
  `;

  return container;
}
