import { useContext } from 'react';
import { ScoreTypeContext } from '../ScoreTypeContext';

export function useScoreType() {
  const ctx = useContext(ScoreTypeContext);
  if (!ctx)
    throw new Error('useScoreType must be used within a ScoreTypeProvider');
  return ctx;
}
