import type { Score, ScoreFormatter } from '../types';

export const setBasedFormatter: ScoreFormatter = (score: Score): string => {
  if (typeof score !== 'string') {
    throw new Error(`Set-based formatter expects a string score, got ${typeof score}`);
  }
  const parts = score.split(',');
  if (parts.length < 2) {
    throw new Error(`Set-based formatter expects main score + sets, got: "${score}"`);
  }
  const [mainScore, ...sets] = parts;
  const setDetails = sets.map((s, i) => `set${i + 1} ${s}`).join(', ');
  return `Main score: ${mainScore} (${setDetails})`;
};
