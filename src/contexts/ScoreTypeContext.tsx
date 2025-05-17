import { createContext } from 'react';
import { ScoreType } from '../types';

interface ScoreTypeContextValue {
  scoreType: ScoreType;
  setScoreType: (score: ScoreType) => void;
}

export const ScoreTypeContext = createContext<
  ScoreTypeContextValue | undefined
>(undefined);
