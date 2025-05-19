import { useState, ReactNode } from 'react';
import { ScoreTypeContext, ScoreTypeContextValue } from './ScoreTypeContext';
import { ScoreType } from '../types';

export default function ScoreTypeProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [scoreType, setScoreType] = useState<ScoreType>('overall');
  const [activeTabPosition, setActiveTabPosition] = useState<{
    left: number;
    width: number;
  }>();

  const value: ScoreTypeContextValue = {
    scoreType,
    setScoreType,
    activeTabPosition,
    setActiveTabPosition,
  };

  return (
    <ScoreTypeContext.Provider value={value}>
      {children}
    </ScoreTypeContext.Provider>
  );
}
