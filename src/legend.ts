// src/ui/legend.ts
import { colors } from './utils/color';

export function createLegend(): HTMLElement {
  const legend = document.createElement('div');
  legend.className = 'legend';

  legend.innerHTML = `
    <input
      type="text"
      id="country-search"
      placeholder="Search a country..."
      class="search-input"
    />
    <div class="score-tabs-container">
      <button class="score-tab active" data-score="overall">Overall</button>
      <button class="score-tab" data-score="life">Life</button>
      <button class="score-tab" data-score="health">Health</button>
      <button class="score-tab" data-score="education">Education</button>
      <button class="score-tab" data-score="protection">Protection</button>
      <button class="score-tab" data-score="environment">Environment</button>
    </div>
    <button id="toggle-methodology" class="methodology-toggle">Methodology ⓘ</button>
    <div class="legend-scale">
      <div class="legend-bar">
        <div style="background: #4b5c6b"></div>
        <div style="background: #5a7d9a"></div>
        <div style="background: #76b5c5"></div>
        <div style="background: #2e9c9f"></div>
        <div style="background: #3fd1c7"></div>
        <div style="
          background: repeating-linear-gradient(
            45deg, #eee, #eee 4px, #bbb 4px, #bbb 8px
          );">
        </div>
      </div>
      <div class="legend-labels">
        <span>Very Poor</span>
        <span>Poor</span>
        <span>Fair</span>
        <span>Good</span>
        <span>Excellent</span>
        <span>No data</span>
      </div>
    </div>
    <div class="legend-methodology hidden-on-mobile" id="methodology-panel">
      <div class="methodology-section methodology-overall">
        <strong>Overall (KRI Score):</strong>
        Combined measure of child rights implementation
      </div>
      <div class="methodology-section methodology-life">
        <strong>Life:</strong>
        Under-5 mortality, life expectancy, maternal mortality
      </div>

      <div class="methodology-section methodology-health">
        <strong>Health:</strong>
        Underweight children, immunization, sanitation, water access
      </div>

      <div class="methodology-section methodology-education">
        <strong>Education:</strong>
        Schooling for girls and boys, gender gap
      </div>

      <div class="methodology-section methodology-protection">
        <strong>Protection:</strong>
        Child labour, adolescent birth rate, birth registration
      </div>

      <div class="methodology-section methodology-environment">
        <strong>Environment:</strong>
        Equal treatment, child voice, funding, detailed data, cooperation with child rights groups
      </div>
    </div>

  `;

  return legend;
}
