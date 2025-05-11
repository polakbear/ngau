// src/state/score-state.ts

import { CountryData } from './types';

let currentScoreType: keyof CountryData = 'environment';

const listeners: ((score: keyof CountryData) => void)[] = [];

export function getScoreType(): keyof CountryData {
  return currentScoreType;
}

export function setScoreType(score: keyof CountryData) {
  if (score === currentScoreType) return;
  currentScoreType = score;
  listeners.forEach((cb) => cb(currentScoreType));
}

export function onScoreChange(callback: (score: keyof CountryData) => void) {
  listeners.push(callback);
}
