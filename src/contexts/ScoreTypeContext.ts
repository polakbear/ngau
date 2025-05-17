import { createContext } from 'react';
import { ScoreType } from '../types';

export interface ScoreTypeContextValue {
  scoreType: ScoreType;
  setScoreType: (score: ScoreType) => void;
}

// Create a default value to avoid undefined checks
const defaultContextValue: ScoreTypeContextValue = {
  scoreType: 'overall',
  setScoreType: () => {},
};

export const ScoreTypeContext =
  createContext<ScoreTypeContextValue>(defaultContextValue);
