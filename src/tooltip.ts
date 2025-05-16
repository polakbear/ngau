import {
  getColorFromRank,
  getContrastingTextColor,
  getBarColor,
  rankBasedColorScale,
} from './utils/color';
import { getPerformanceLabel, getFullLabel } from './utils/score';
import { CountryData, Nullable } from './types';

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
               style="width: 0%; --bar-color: ${getBarColor(value)};"
               data-score="${value || 0}">
          </div>
        </div>
      </div>
    </div>
  `;
}

export function generateTooltipContent(
  countryName: string,
  country: CountryData | undefined,
  options: { closeButton?: boolean; animateBars?: boolean } = {}
): string {
  const { closeButton = false } = options;
  const total = 194;
  const kri = country?.kri_score ?? null;
  const rank = country?.kri_rank ?? null;
  const rankQual = rank != null ? getFullLabel(rank, total) : '';

  const findValue = (type: string) =>
    country?.indicators?.find((i) => i.type === type)?.value_total;
  const cm = findValue('child_marriage');
  const cl = findValue('child_labor');
  const fg = findValue('fgm_prevalence');
  const hasViolations = cm != null || cl != null || fg != null;

  const bgColor = rankBasedColorScale(rank ?? 0);
  const textColor = getContrastingTextColor(bgColor);
  return `
    
<div class="tooltip-top-row" style="flex-direction: column; align-items: flex-start; margin-bottom: 8px;">
  <div class="tooltip-header">${countryName}</div>

  <div class="tooltip-badges-row">
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
