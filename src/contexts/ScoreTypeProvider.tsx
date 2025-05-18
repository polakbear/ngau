import { useState, ReactNode } from 'react';
import { ScoreTypeContext, ScoreTypeContextValue } from './ScoreTypeContext';
import { ScoreType } from '../types';

export default function ScoreTypeProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [scoreType, setScoreType] = useState<ScoreType>('overall');

  const value: ScoreTypeContextValue = {
    scoreType,
    setScoreType,
  };

  return (
    <ScoreTypeContext.Provider value={value}>
      {children}
    </ScoreTypeContext.Provider>
  );
}
