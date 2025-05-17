import { useContext } from 'react';
import {
  ScoreTypeContext,
  ScoreTypeContextValue,
} from '../contexts/ScoreTypeContext';

export default function useScoreType(): ScoreTypeContextValue {
  return useContext(ScoreTypeContext);
}
