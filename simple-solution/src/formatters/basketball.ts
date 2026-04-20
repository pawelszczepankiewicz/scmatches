import type { Score, ScoreFormatter } from '../types';

export const basketballFormatter: ScoreFormatter = (score: Score): string => {
  if (!Array.isArray(score)) {
    throw new Error(`Basketball formatter expects an array score, got ${typeof score}`);
  }
  return score.flat().join(',');
};
