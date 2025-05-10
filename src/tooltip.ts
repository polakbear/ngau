import {
  svgLeaf,
  svgHealth,
  svgEducation,
  svgShield,
  svgPlanet,
  svgMarriage,
  svgLabor,
  svgFGM,
} from "./icons";
import { CountryData } from "./types";

function scoreLabel(score: number | null | undefined): string {
  if (score === null || score === undefined) return "N/A";
  if (score < 0.2) return "Very Poor";
  if (score < 0.4) return "Poor";
  if (score < 0.6) return "Fair";
  if (score < 0.8) return "Good";
  return "Excellent";
}

function getBadgeColor(rank: number | undefined): string {
  if (rank === undefined) return "#646464"; // Default gray for undefined ranks

  const normalizedRank = (198 - rank) / (198 - 1);

  // Interpolate between green (#2e9c9f) and red (#f44141)
  const red = Math.round(244 + (46 - 244) * normalizedRank); // From 244 (red) to 46 (green)
  const green = Math.round(65 + (156 - 65) * normalizedRank); // From 65 (red) to 156 (green)
  const blue = Math.round(65 + (159 - 65) * normalizedRank); // From 65 (red) to 159 (green)

  return `rgb(${red}, ${green}, ${blue})`;
}

export function generateTooltipContent(
  countryName: string,
  country: CountryData
): string {
  const rank = country.kri_rank;
  const rankColor = getBadgeColor(rank ?? -1);

  const getIndicatorValue = (type: string): number | undefined =>
    country?.indicators?.find((indicator) => indicator.type === type)
      ?.value_total;

  const childMarriageValue = getIndicatorValue("child_marriage");
  const childLaborValue = getIndicatorValue("child_labor");
  const fgmPrevalenceValue = getIndicatorValue("fgm_prevalence");

  const childMarriage =
    childMarriageValue !== undefined
      ? `<div class="tooltip-row">
           <span class="left">${svgMarriage()}<span class="label">Child Marriage:</span></span>
           <span class="value">${childMarriageValue}%</span>
         </div>`
      : "";

  const childLabor =
    childLaborValue !== undefined
      ? `<div class="tooltip-row">
           <span class="left">${svgLabor()}<span class="label">Child Labor:</span></span>
           <span class="value">${childLaborValue}%</span>
         </div>`
      : "";

  const fgmPrevalence =
    fgmPrevalenceValue !== undefined
      ? `<div class="tooltip-row">
           <span class="left">${svgFGM()}<span class="label">FGM Prevalence:</span></span>
           <span class="value">${fgmPrevalenceValue}%</span>
         </div>`
      : "";

  const childRightsViolations =
    childMarriage || childLabor || fgmPrevalence
      ? `
        <div class="tooltip-subtitle">Child Rights Violations</div>
        <div class="tooltip-section">
          ${childMarriage}
          ${childLabor}
          ${fgmPrevalence}
        </div>`
      : "";

  return `
    <div class="tooltip-header">
      ${countryName}
      <div class="tooltip-badge" style="background: ${rankColor};">
        ${rank ?? "N/A"}
      </div>
    </div>

    <div class="tooltip-score-row">
      <span class="label">KRI Score:</span>
      <span class="right">
        <span class="value">${country?.kri_score ?? "N/A"}</span>
        <span class="qual">${scoreLabel(country?.kri_score)}</span>
      </span>
    </div>

    <div class="tooltip-section">
      <div class="tooltip-row">
        <span class="left">${svgLeaf()}<span class="label">Life:</span></span>
        <span class="right">
          <span class="value">${country?.life ?? "N/A"}</span>
          <span class="qual">${scoreLabel(country?.life)}</span>
        </span>
      </div>
      <div class="tooltip-row">
        <span class="left">${svgHealth()}<span class="label">Health:</span></span>
        <span class="right">
          <span class="value">${country?.health ?? "N/A"}</span>
          <span class="qual">${scoreLabel(country?.health)}</span>
        </span>
      </div>
      <div class="tooltip-row">
        <span class="left">${svgEducation()}<span class="label">Education:</span></span>
        <span class="right">
          <span class="value">${country?.education ?? "N/A"}</span>
          <span class="qual">${scoreLabel(country?.education)}</span>
        </span>
      </div>
      <div class="tooltip-row">
        <span class="left">${svgShield()}<span class="label">Protection:</span></span>
        <span class="right">
          <span class="value">${country?.protection ?? "N/A"}</span>
          <span class="qual">${scoreLabel(country?.protection)}</span>
        </span>
      </div>
      <div class="tooltip-row">
        <span class="left">${svgPlanet()}<span class="label">Environment:</span></span>
        <span class="right">
          <span class="value">${country?.environment ?? "N/A"}</span>
          <span class="qual">${scoreLabel(country?.environment)}</span>
        </span>
      </div>
    </div>

    ${childRightsViolations}
  `;
}
