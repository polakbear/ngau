import { colors, rankBasedColorScale } from './utils/color';

const MAX_RANK = 194;

export function createLegend(): HTMLElement {
  const legend = document.createElement('div');
  legend.className = 'legend';

  // use rankBasedColorScale for legend gradient
  const colorStops = [];
  const numStops = 20;

  for (let i = 0; i < numStops; i++) {
    const rank = Math.round(MAX_RANK - (i * (MAX_RANK - 1)) / (numStops - 1));
    const percent = (i / (numStops - 1)) * 100;
    colorStops.push(`${rankBasedColorScale(rank)} ${percent}%`);
  }

  const gradientCSS = colorStops.join(', ');

  legend.innerHTML = `
    <div class="legend-container">
      <div class="legend-scale">
      <div class="legend-bar">
        <div class="legend-no-data" style="--no-data-color: ${colors.noData}; --no-data-color-light: #444;"></div>
        <div class="legend-gradient" style="background: linear-gradient(to right, ${gradientCSS});"></div>
      </div>
      <div class="legend-row">
        <div class="legend-labels">
          <span class="legend-label-nodata">No data</span>
          <div class="legend-gradient-labels">
            <span class="legend-label-verypoor">Very Poor</span>
            <span class="legend-label-poor">Poor</span>
            <span class="legend-label-fair">Fair</span>
            <span class="legend-label-good">Good</span>
            <span class="legend-label-excellent">Excellent</span>
          </div>
        </div>
      </div>
      <div class="data-sources">
        Data sources: <a href="https://www.kidsrights.org/" target="_blank" rel="noopener">Kids Rights Index</a>, <a href="https://data.unicef.org/" target="_blank" rel="noopener">UNICEF datasets</a>
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
        <strong>Empowerment & Equality:</strong>
        Equal treatment, child voice, funding, detailed data, cooperation with child rights groups
      </div>
    </div>

  `;

  return legend;
}
