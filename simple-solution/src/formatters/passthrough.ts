import type { Score, ScoreFormatter } from '../types';

export const passthroughFormatter: ScoreFormatter = (score: Score): string => {
  if (typeof score !== 'string') {
    throw new Error(`Passthrough formatter expects a string score, got ${typeof score}`);
  }
  return score;
};
