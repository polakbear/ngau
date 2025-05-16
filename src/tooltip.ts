import {
  getColorFromRank,
  getContrastingTextColor,
  getBarColor,
  rankBasedColorScale,
} from './utils/color';
import { getPerformanceLabel, getFullLabel } from './utils/score';
import { CountryData, Nullable, IndicatorEntry } from './types';

function buildMetricRow(
  iconClass: string,
  label: string,
  value: Nullable,
  rank: Nullable
): string {
  const total = 194;
  const performance = getPerformanceLabel(rank ?? null, total);
  const color = getColorFromRank(rank ?? null, total);

  return `
    <div class="tooltip-metric">
      <div class="metric-label"><i class="${iconClass}"></i><span>${label}</span></div>
      <div class="metric-info">
        <div class="metric-row">
          <div class="split-badge">
            ${rank != null ? `<span class="split-left">Rank ${rank.toString().padStart(3, '\u00A0')}</span>` : ''}
            <span class="split-right" style="background-color: ${color}; color: ${getContrastingTextColor(color)}">${performance}</span>
          </div>
          <span class="value">${value != null ? value.toFixed(3) : ''}</span>
        </div>
        <div class="bar-container">
          <div class="bar-fill"
               style="width: 0%; --bar-color: ${getBarColor(rank)};"
               data-score="${value || 0}">
          </div>
        </div>
      </div>
    </div>
  `;
}

// Function to build indicator progress bar
function buildIndicatorProgressBar(
  label: string,
  value: number,
  maxValue: number = 100
): string {
  const percentage = Math.min(100, (value / maxValue) * 100);

  return `
    <div class="indicator-item">
      <div class="indicator-label">${label}</div>
      <div class="indicator-value-bar">
        <div class="indicator-bar-container">
          <div class="indicator-bar-fill" style="width: 0%;" data-percentage="${percentage}"></div>
        </div>
        <span class="indicator-value">${value}%</span>
      </div>
    </div>
  `;
}

// Generate HTML for specific indicator types
function generateIndicatorSection(
  indicators: IndicatorEntry[] | undefined
): string {
  if (!indicators || indicators.length === 0) return '';

  let html = '';

  // Process female child marriage indicators
  const femaleChildMarriage = indicators.find(
    (i) => i.indicator_type === 'female_child_marriage'
  );
  if (femaleChildMarriage) {
    html += `<div class="indicator-section">
      <div class="indicator-title">
        <i class="fas fa-ring"></i> Child Marriage (Female)
      </div>
      <div class="indicator-content">`;

    if (
      femaleChildMarriage.value_female_15 !== null &&
      femaleChildMarriage.value_female_15 !== undefined
    ) {
      html += buildIndicatorProgressBar(
        'Married by age 15',
        femaleChildMarriage.value_female_15
      );
    }

    if (
      femaleChildMarriage.value_female_18 !== null &&
      femaleChildMarriage.value_female_18 !== undefined
    ) {
      html += buildIndicatorProgressBar(
        'Married by age 18',
        femaleChildMarriage.value_female_18
      );
    }

    html += `
        <div class="indicator-source">
          Source: ${femaleChildMarriage.data_source || 'Not specified'} (${femaleChildMarriage.year || 'Year not specified'})
        </div>
      </div>
    </div>`;
  }

  // Process male child marriage indicators
  const maleChildMarriage = indicators.find(
    (i) => i.indicator_type === 'male_child_marriage'
  );
  if (
    maleChildMarriage &&
    maleChildMarriage.value_male_18 !== null &&
    maleChildMarriage.value_male_18 !== undefined
  ) {
    html += `<div class="indicator-section">
      <div class="indicator-title">
        <i class="fas fa-ring"></i> Child Marriage (Male)
      </div>
      <div class="indicator-content">
        ${buildIndicatorProgressBar('Married by age 18', maleChildMarriage.value_male_18)}
        <div class="indicator-source">
          Source: ${maleChildMarriage.data_source || 'Not specified'} (${maleChildMarriage.year || 'Year not specified'})
        </div>
      </div>
    </div>`;
  }

  // Process violent discipline indicators
  const violentDiscipline = indicators.find(
    (i) => i.indicator_type === 'violent_discipline'
  );
  if (violentDiscipline) {
    html += `<div class="indicator-section">
      <div class="indicator-title">
        <i class="fas fa-hand"></i> Violent Discipline
      </div>
      <div class="indicator-content">`;

    if (
      violentDiscipline.value_total !== null &&
      violentDiscipline.value_total !== undefined
    ) {
      html += buildIndicatorProgressBar('Total', violentDiscipline.value_total);
    }

    if (
      violentDiscipline.value_male !== null &&
      violentDiscipline.value_male !== undefined
    ) {
      html += buildIndicatorProgressBar('Male', violentDiscipline.value_male);
    }

    if (
      violentDiscipline.value_female !== null &&
      violentDiscipline.value_female !== undefined
    ) {
      html += buildIndicatorProgressBar(
        'Female',
        violentDiscipline.value_female
      );
    }

    html += `
        <div class="indicator-source">
          Source: ${violentDiscipline.data_source || 'Not specified'} (${violentDiscipline.year || 'Year not specified'})
        </div>
      </div>
    </div>`;
  }

  // Process FGM indicators
  const fgm = indicators.find((i) => i.indicator_type === 'fgm');
  if (fgm) {
    html += `<div class="indicator-section">
      <div class="indicator-title">
        <i class="fas fa-triangle-exclamation"></i> Female Genital Mutilation
      </div>
      <div class="indicator-content">`;

    if (fgm.value_girls_0_14 !== null && fgm.value_girls_0_14 !== undefined) {
      html += buildIndicatorProgressBar(
        'Girls aged 0-14',
        fgm.value_girls_0_14
      );
    }

    if (fgm.value_urban !== null && fgm.value_urban !== undefined) {
      html += buildIndicatorProgressBar('Urban', fgm.value_urban);
    }

    if (fgm.value_rural !== null && fgm.value_rural !== undefined) {
      html += buildIndicatorProgressBar('Rural', fgm.value_rural);
    }

    html += `
        <div class="indicator-source">
          Source: ${fgm.data_source || 'Not specified'} (${fgm.year || 'Year not specified'})
        </div>
      </div>
    </div>`;
  }

  return html ? `<div class="indicators-container">${html}</div>` : '';
}

export function generateTooltipContent(
  countryName: string,
  country: CountryData | undefined,
  options: { closeButton?: boolean } = {}
): string {
  const { closeButton = false } = options;
  const total = 194;
  const kri = country?.kri_score ?? null;
  const rank = country?.kri_rank ?? null;
  const rankQual = rank != null ? getFullLabel(rank, total) : '';

  // Check for indicators
  const hasIndicators = country?.indicators && country.indicators.length > 0;

  // Legacy indicators for backward compatibility
  const findValue = (type: string) =>
    country?.indicators?.find((i) => i.indicator_type === type)?.value_total;
  const cm = findValue('child_marriage');
  const cl = findValue('child_labor');
  const fg = findValue('fgm');
  const hasViolations = cm != null || cl != null || fg != null;

  const bgColor = rankBasedColorScale(rank ?? 0);
  const textColor = getContrastingTextColor(bgColor);

  const pinIcon = `<div style="position: absolute; top: 15px; right: 15px;">
      <i class="fas fa-thumbtack pinned-icon" title="Pinned"></i>
    </div>`;

  return `
  ${closeButton ? pinIcon : ''}
    
<div class="tooltip-top-row" style="flex-direction: column; align-items: flex-start; margin-bottom: 8px; ${closeButton ? 'padding-right: 30px;' : ''}">
  <div class="tooltip-header">
    ${countryName}
  </div>

  <div class="tooltip-badges-row" style="${closeButton ? 'display: flex; flex-wrap: nowrap; justify-content: space-between; width: 100%;' : ''}">
    <div class="tooltip-badge">
      <i class="fa fa-star" style="color: #3fd1c7; margin-right: 4px;"></i>
      <strong>KRI</strong> ${kri != null ? kri.toFixed(3) : 'N/A'}
      <span class="badge-divider">|</span>
      <strong>Rank</strong> ${rank != null ? rank : 'N/A'} / ${total}
    </div>

    <div class="badge-qual" style="background-color: ${bgColor}; color: ${textColor};">
      ${rankQual}
    </div>
  </div>
</div>

<!-- Metrics -->
<div class="tooltip-metrics-grid">
  ${buildMetricRow('fa fa-seedling', 'Life', country?.life, country?.ranking_life)}
  ${buildMetricRow('fa fa-heart', 'Health', country?.health, country?.ranking_health)}
  ${buildMetricRow('fa fa-graduation-cap', 'Education', country?.education, country?.ranking_education)}
  ${buildMetricRow('fa fa-shield-alt', 'Protection', country?.protection, country?.ranking_protection)}
  ${buildMetricRow('fa fa-globe', 'Environment', country?.environment, country?.ranking_environment)}
</div>

${
  hasIndicators
    ? `
<div class="tooltip-subtitle">Indicators</div>
${generateIndicatorSection(country?.indicators)}
`
    : ''
}

${
  hasViolations
    ? `
  <div class="tooltip-subtitle">Child Rights Violations</div>
  <div class="tooltip-section">
    ${cm != null ? `<div class="tooltip-row"><span class="left"><i class="fas fa-triangle-exclamation"></i><span>Child Marriage</span></span><span class="value">${cm}%</span></div>` : ''}
    ${cl != null ? `<div class="tooltip-row"><span class="left"><i class="fas fa-triangle-exclamation"></i><span>Child Labor</span></span><span class="value">${cl}%</span></div>` : ''}
    ${fg != null ? `<div class="tooltip-row"><span class="left"><i class="fas fa-triangle-exclamation"></i><span>FGM Prevalence</span></span><span class="value">${fg}%</span></div>` : ''}
  </div>
`
    : ''
}

${
  closeButton
    ? `
  <div style="text-align: right; margin-top: 12px;">
    <button id="close-info" style="
      background: none;
      color: #89cfff;
      border: none;
      cursor: pointer;
      font-size: 13px;
    ">Close</button>
  </div>`
    : ''
}
  `;
}

// Function to animate the progress bars
export function animateIndicatorBars() {
  setTimeout(() => {
    const progressBars = document.querySelectorAll(
      '.indicator-bar-fill[data-percentage]'
    );

    progressBars.forEach((bar) => {
      const percentage = bar.getAttribute('data-percentage') || '0';
      (bar as HTMLElement).style.width = `${percentage}%`;
    });
  }, 100);
}

// Function to animate all the bars in the tooltip
export function animateTooltipBars() {
  setTimeout(() => {
    // Animate metric bars
    const metricBars = document.querySelectorAll('.bar-fill[data-score]');
    metricBars.forEach((bar) => {
      const score = parseFloat(bar.getAttribute('data-score') || '0');
      (bar as HTMLElement).style.width = `${score * 100}%`;
    });

    // Animate indicator bars
    animateIndicatorBars();
  }, 100);
}
