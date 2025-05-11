import * as d3 from 'd3-scale';
import { Nullable } from '../types';

export const colors = {
  excellent: '#3fd1c7',
  good: '#2e9c9f',
  fair: '#76b5c5',
  poor: '#5a7d9a',
  veryPoor: '#4b5c6b',
  noData: '#444444',
};

export const childRightsColorScale = d3
  .scaleLinear<string>()
  .domain([0.0, 0.2, 0.4, 0.6, 0.8, 1.0])
  .range([
    colors.veryPoor,
    colors.veryPoor,
    colors.poor,
    colors.fair,
    colors.good,
    colors.excellent,
  ]);

export function getContrastingTextColor(bg: string): string {
  const r = parseInt(bg.slice(1, 3), 16);
  const g = parseInt(bg.slice(3, 5), 16);
  const b = parseInt(bg.slice(5, 7), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 140 ? '#000' : '#fff';
}

export function getColorFromRank(rank: number | null, total: number): string {
  if (rank === null) return colors.noData;
  const percentile = (total - rank) / total;

  if (percentile >= 0.9) return colors.excellent;
  if (percentile >= 0.6) return colors.good;
  if (percentile >= 0.4) return colors.fair;
  if (percentile >= 0.1) return colors.poor;
  return colors.veryPoor;
}

export function getBarColor(score: Nullable): string {
  if (score == null) return colors.noData;
  return childRightsColorScale(score);
}

export function getColor(score?: number): string {
  if (score === undefined || isNaN(score)) return colors.noData;
  return childRightsColorScale(score);
}
