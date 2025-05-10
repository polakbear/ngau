import * as d3 from "d3-scale";
import { Nullable } from "./types";

export const childRightsColorScale = d3
  .scaleLinear<string>()
  .domain([0.0, 0.2, 0.4, 0.6, 0.8, 1.0])
  .range(["#4b5c6b", "#4b5c6b", "#5a7d9a", "#76b5c5", "#2e9c9f", "#3fd1c7"]);

  export function getContrastingTextColor(bg: string): string {
    // Remove leading # and parse RGB hex
    const r = parseInt(bg.slice(1, 3), 16);
    const g = parseInt(bg.slice(3, 5), 16);
    const b = parseInt(bg.slice(5, 7), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 140 ? '#000' : '#fff';
  }
  
  export function getBarColor(score: Nullable): string {
    if (score == null) return '#444';
    if (score < 0.2) return '#4b5c6b';
    if (score < 0.4) return '#5a7d9a';
    if (score < 0.6) return '#76b5c5';
    if (score < 0.8) return '#2e9c9f';
    return '#3fd1c7';
  }
  