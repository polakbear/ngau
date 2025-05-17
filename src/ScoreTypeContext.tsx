import React, { useState, ReactNode, createContext } from 'react';
import { ScoreType } from './types';

export interface ScoreTypeContextValue {
  scoreType: ScoreType;
  setScoreType: (score: ScoreType) => void;
}

export const ScoreTypeContext = createContext<
  ScoreTypeContextValue | undefined
>(undefined);

export function ScoreTypeProvider({ children }: { children: ReactNode }) {
  const [scoreType, setScoreType] = useState<ScoreType>('overall');
  return (
    <ScoreTypeContext.Provider value={{ scoreType, setScoreType }}>
      {children}
    </ScoreTypeContext.Provider>
  );
}
