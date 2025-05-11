// src/state/score-state.ts

import { CountryData } from './types';

type ScoreType = keyof CountryData | 'overall';
let currentScoreType: ScoreType = 'overall';

const listeners: ((score: ScoreType) => void)[] = [];

export function getScoreType(): ScoreType {
  return currentScoreType;
}

export function setScoreType(score: ScoreType) {
  if (score === currentScoreType) return;
  currentScoreType = score;
  listeners.forEach((cb) => cb(currentScoreType));
}

export function onScoreChange(callback: (score: ScoreType) => void) {
  listeners.push(callback);
}
