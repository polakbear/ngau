import { Nullable } from "./types";

export function scoreLabel(score: Nullable): string {
  if (score == null) return "N/A";
  if (score < 0.2) return "Very Poor";
  if (score < 0.4) return "Poor";
  if (score < 0.6) return "Fair";
  if (score < 0.8) return "Good";
  return "Excellent";
}

export function scoreClass(score: Nullable): string {
  if (score == null) return 'qual--na';
  if (score < 0.2) return 'qual--very-poor';
  if (score < 0.4) return 'qual--poor';
  if (score < 0.6) return 'qual--fair';
  if (score < 0.8) return 'qual--good';
  return 'qual--excellent';
}

export  function rankLabel(rank: number, total: number): string {
  const p = rank / total;
  if (p <= 0.1) return 'Top 10%';
  if (p <= 0.3) return 'Above Average';
  if (p <= 0.7) return 'Middle';
  if (p <= 0.9) return 'Below Average';
  return 'Bottom 10%';
}
