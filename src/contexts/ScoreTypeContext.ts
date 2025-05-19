import { createContext } from 'react';
import { ScoreType } from '../types';

export interface ScoreTypeContextValue {
  scoreType: ScoreType;
  setScoreType: (score: ScoreType) => void;
  activeTabPosition?: {
    left: number;
    width: number;
  };
  setActiveTabPosition: (
    position: { left: number; width: number } | undefined
  ) => void;
}

const defaultContextValue: ScoreTypeContextValue = {
  scoreType: 'overall',
  setScoreType: () => {},
  activeTabPosition: undefined,
  setActiveTabPosition: () => {},
};

export const ScoreTypeContext =
  createContext<ScoreTypeContextValue>(defaultContextValue);
