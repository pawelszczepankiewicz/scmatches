import type { Score, ScoreFormatter, SportConfig } from '../types/match';

export const passthroughFormatter: ScoreFormatter = (score: Score): string => {
  if (typeof score !== 'string') {
    throw new Error(`Passthrough formatter expects a string score, got ${typeof score}`);
  }
  return score;
};

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

export const basketballFormatter: ScoreFormatter = (score: Score): string => {
  if (!Array.isArray(score)) {
    throw new Error(`Basketball formatter expects an array score, got ${typeof score}`);
  }
  return score.flat().join(',');
};

export const SPORT_CONFIG: Record<string, SportConfig> = {
  soccer:     { nameSeparator: ' - ', formatScore: passthroughFormatter },
  volleyball: { nameSeparator: ' - ', formatScore: setBasedFormatter },
  handball:   { nameSeparator: ' vs ', formatScore: passthroughFormatter },
  basketball: { nameSeparator: ' - ', formatScore: basketballFormatter },
  tennis:     { nameSeparator: ' vs ', formatScore: setBasedFormatter },
};
