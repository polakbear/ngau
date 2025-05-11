export function createScoreTabs(): HTMLElement {
  const container = document.createElement('div');
  container.className = 'score-tabs-container';

  container.innerHTML = `
    <button class="score-tab active" data-score="overall">Overall</button>
    <button class="score-tab" data-score="life">Life</button>
    <button class="score-tab" data-score="health">Health</button>
    <button class="score-tab" data-score="education">Education</button>
    <button class="score-tab" data-score="protection">Protection</button>
    <button class="score-tab" data-score="environment">Environment</button>
  `;

  return container;
}
