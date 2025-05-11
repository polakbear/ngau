export function createLegend(): HTMLElement {
  const legend = document.createElement('div');
  legend.className = 'legend';

  legend.innerHTML = `
    <div class="legend-container">
      <div class="legend-scale">
      <div class="legend-bar">
        <div style="background: repeating-linear-gradient(
            45deg, #eee, #eee 4px, #bbb 4px, #bbb 8px);"></div>
        <div style="background: #4b5c6b"></div>
        <div style="background: #5a7d9a"></div>
        <div style="background: #76b5c5"></div>
        <div style="background: #2e9c9f"></div>
        <div style="background: #3fd1c7"></div>
      </div>
      <div class="legend-row">
        <div class="legend-labels">
          <span>No data</span>
          <span>Very Poor</span>
          <span>Poor</span>
          <span>Fair</span>
          <span>Good</span>
          <span>Excellent</span>
        </div>
      </div>
      <span id="toggle-methodology" class="methodology-toggle" role="button" tabindex="0" aria-label="Show methodology">ⓘ</span>
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
