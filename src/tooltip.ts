import {
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
  const color = rankBasedColorScale(rank ?? 0);

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

function buildIndicatorProgressBar(
  label: string,
  value: number,
  maxValue: number = 100,
  compact: boolean = false,
  customClass: string = ''
): string {
  const percentage = Math.min(100, (value / maxValue) * 100);
  const labelClass = compact ? 'indicator-label compact' : 'indicator-label';

  return `
    <div class="indicator-item">
      <div class="${labelClass}">${label}</div>
      <div class="indicator-value-bar">
        <div class="indicator-bar-container">
          <div class="indicator-bar-fill ${customClass}" style="width: 0%;" data-percentage="${percentage}"></div>
        </div>
        <span class="indicator-value">${value}<span style="font-size: 9px; opacity: 0.8;">%</span></span>
      </div>
    </div>
  `;
}

function generateIndicatorSection(
  indicators: IndicatorEntry[] | undefined
): string {
  if (!indicators || indicators.length === 0) return '';

  let html = '';

  // Get female and male child marriage indicators
  const femaleChildMarriage = indicators.find(
    (i) => i.indicator_type === 'female_child_marriage'
  );
  const maleChildMarriage = indicators.find(
    (i) => i.indicator_type === 'male_child_marriage'
  );

  // If we have either female or male child marriage indicators, we'll show them side by side
  if (femaleChildMarriage || maleChildMarriage) {
    const femaleSources = femaleChildMarriage
      ? `${femaleChildMarriage.data_source || 'Not specified'} (${femaleChildMarriage.year || 'Year not specified'})`
      : '';
    const maleSources = maleChildMarriage
      ? `${maleChildMarriage.data_source || 'Not specified'} (${maleChildMarriage.year || 'Year not specified'})`
      : '';

    // Determine the source text to display (use female source if available, otherwise male)
    const sourceText = femaleSources || maleSources;

    html += `<div class="indicator-section">
      <div class="indicator-title">
        <i class="fas fa-ring"></i> Child Marriage
      </div>
      <div class="child-marriage-grid">
        <div class="child-marriage-column">
          <div class="child-marriage-title">
            <i class="fas fa-venus" style="color: #ff9f43;"></i> Female
          </div>`;

    // Add female child marriage indicators if available
    if (femaleChildMarriage) {
      if (
        femaleChildMarriage.value_female_15 !== null &&
        femaleChildMarriage.value_female_15 !== undefined
      ) {
        html += buildIndicatorProgressBar(
          '<i class="fas fa-child" style="font-size: 10px; margin-right: 4px; color: #ff9f43;"></i>By age 15',
          femaleChildMarriage.value_female_15,
          100,
          false,
          'indicator-bar-fill'
        );
      }

      if (
        femaleChildMarriage.value_female_18 !== null &&
        femaleChildMarriage.value_female_18 !== undefined
      ) {
        html += buildIndicatorProgressBar(
          '<i class="fas fa-female" style="font-size: 10px; margin-right: 4px; color: #ff9f43;"></i>By age 18',
          femaleChildMarriage.value_female_18,
          100,
          false,
          'indicator-bar-fill'
        );
      }
    } else {
      html += `<div class="indicator-item">
        <div class="indicator-label"><i class="fas fa-exclamation-circle" style="font-size: 10px; margin-right: 4px; opacity: 0.7; color: #ff9f43;"></i>No data available</div>
      </div>`;
    }

    html += `</div>
        <div class="child-marriage-column">
          <div class="child-marriage-title">
            <i class="fas fa-mars" style="color: #ff9f43;"></i> Male
          </div>`;

    // Add male child marriage indicators if available
    if (
      maleChildMarriage &&
      maleChildMarriage.value_male_18 !== null &&
      maleChildMarriage.value_male_18 !== undefined
    ) {
      html += buildIndicatorProgressBar(
        '<i class="fas fa-male" style="font-size: 10px; margin-right: 4px; color: #ff9f43;"></i>By age 18',
        maleChildMarriage.value_male_18,
        100,
        false,
        'male-bar'
      );
    } else {
      html += `<div class="indicator-item"><div class="indicator-label"><i class="fas fa-exclamation-circle" style="font-size: 10px; margin-right: 4px; opacity: 0.7; color: #ff9f43;"></i>No data available</div></div>`;
    }

    html += `</div>
        <div class="child-marriage-source">
          <i class="fas fa-info-circle" style="font-size: 9px; margin-right: 3px; color: #ff9f43;"></i> Source: ${sourceText}
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

  // FGM indicators
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

  const hasIndicators = country?.indicators && country.indicators.length > 0;

  const findValue = (type: string) =>
    country?.indicators?.find((i) => i.indicator_type === type)?.value_total;
  const cm = findValue('child_marriage');
  const cl = findValue('child_labor');
  const fg = findValue('fgm');
  const hasViolations = cm != null || cl != null || fg != null;

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

    <div class="badge-qual" style="background-color: ${rankBasedColorScale(rank ?? 0)}; color: ${getContrastingTextColor(rankBasedColorScale(rank ?? 0))}">
      ${rankQual}
    </div>
  </div>
</div>

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

export function animateTooltipBars() {
  setTimeout(() => {
    const metricBars = document.querySelectorAll('.bar-fill[data-score]');
    metricBars.forEach((bar) => {
      const score = parseFloat(bar.getAttribute('data-score') || '0');
      (bar as HTMLElement).style.width = `${score * 100}%`;
    });

    animateIndicatorBars();
  }, 100);
}
