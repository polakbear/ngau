import {
  svgLife,
  svgHealth,
  svgHat,
  svgShield,
  svgPlanet,
  svgMarriage,
  svgLabor,
  svgFGM,
} from "./icons";
import { CountryData } from "./types";
import * as d3 from "d3-scale";

type Nullable = number | null | undefined;

function getContrastingTextColor(bg: string): string {
  // Remove leading # and parse RGB hex
  const r = parseInt(bg.slice(1, 3), 16);
  const g = parseInt(bg.slice(3, 5), 16);
  const b = parseInt(bg.slice(5, 7), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 140 ? '#000' : '#fff';
}


// Returns qualitative label for a score
function scoreLabel(score: Nullable): string {
  if (score == null) return "N/A";
  if (score < 0.2) return "Very Poor";
  if (score < 0.4) return "Poor";
  if (score < 0.6) return "Fair";
  if (score < 0.8) return "Good";
  return "Excellent";
}

// Returns hex color for a score bar
function getBarColor(score: Nullable): string {
  if (score == null) return '#444';
  if (score < 0.2) return '#4b5c6b';
  if (score < 0.4) return '#5a7d9a';
  if (score < 0.6) return '#76b5c5';
  if (score < 0.8) return '#2e9c9f';
  return '#3fd1c7';
}

// Returns rank quality label
function rankLabel(rank: number, total: number): string {
  const p = rank / total;
  if (p <= 0.1) return 'Top 10%';
  if (p <= 0.25) return 'Top Quartile';
  if (p >= 0.9) return 'Bottom 10%';
  if (p >= 0.75) return 'Bottom Quartile';
  return 'Middle';
}

const childRightsColorScale = d3
  .scaleLinear<string>()
  .domain([0.0, 0.2, 0.4, 0.6, 0.8, 1.0])
  .range(["#4b5c6b", "#4b5c6b", "#5a7d9a", "#76b5c5", "#2e9c9f", "#3fd1c7"]);

// Builds a metric cell for the grid
function buildMetricRow(icon: string, label: string, value: Nullable): string {
  const barColor = getBarColor(value);
  const qualColor = getContrastingTextColor(barColor);

  return `
    <div class="tooltip-metric">
      <div class="metric-label"><i class="fas fa-${icon}"></i><span>${label}</span></div>
      <div class="metric-info">
        <span class="value">${value != null ? value.toFixed(3) : 'N/A'}</span>
        <span class="qual" style="background-color: ${barColor}; color: ${qualColor};">
          ${scoreLabel(value)}
        </span>
        <div class="bar-container">
          <div class="bar-fill" style="width: ${(value || 0) * 100}%; --bar-color: ${getBarColor(value)};"></div>
        </div>
      </div>
    </div>
  `;
}

// Main tooltip content generator
export function generateTooltipContent(
  countryName: string,
  country: CountryData | undefined
): string {
  const total = 198;
  const kri = country?.kri_score ?? null;
  const rank = country?.kri_rank ?? null;
  const rankQual = rank != null ? rankLabel(rank, total) : '';

  // Child rights indicators
  const findValue = (type: string) =>
    country?.indicators?.find(i => i.type === type)?.value_total;
  const cm = findValue('child_marriage');
  const cl = findValue('child_labor');
  const fg = findValue('fgm_prevalence');
  const hasViolations = cm != null || cl != null || fg != null;

  const bgColor = childRightsColorScale(kri ?? 0);
  const textColor = getContrastingTextColor(bgColor);

  return `
    
<div class="tooltip-top-row" style="flex-direction: column; align-items: flex-start; margin-bottom: 8px;">
  <div class="tooltip-header">${countryName}</div>

  <div class="tooltip-badge" style="margin: 4px 0;">
    <strong>KRI</strong> ${kri != null ? kri.toFixed(3) : 'N/A'}
    <span class="badge-divider">|</span>
    <strong>Rank</strong> ${rank != null ? rank : 'N/A'} / ${total}
  </div>

<div class="badge-qual" style="background-color: ${bgColor}; color: ${textColor};">
  ${rankQual}
</div>
</div>

    <!-- Metrics -->
    <div class="tooltip-metrics-grid">
      ${buildMetricRow('seedling', 'Life', country?.life)}
      ${buildMetricRow('heart', 'Health', country?.health)}
      ${buildMetricRow('graduation-cap', 'Education', country?.education)}
      ${buildMetricRow('shield-alt', 'Protection', country?.protection)}
      ${buildMetricRow('globe', 'Environment', country?.environment)}
    </div>

    <!-- Child Rights Violations -->
    ${hasViolations ? `
      <div class="tooltip-subtitle">Child Rights Violations</div>
      <div class="tooltip-section">
        ${cm != null ? `<div class="tooltip-row"><span class="left">${svgMarriage()}<span>Child Marriage</span></span><span class="value">${cm}%</span></div>` : ''}
        ${cl != null ? `<div class="tooltip-row"><span class="left">${svgLabor()}<span>Child Labor</span></span><span class="value">${cl}%</span></div>` : ''}
        ${fg != null ? `<div class="tooltip-row"><span class="left">${svgFGM()}<span>FGM Prevalence</span></span><span class="value">${fg}%</span></div>` : ''}
      </div>
    ` : ''}
  `;
}
