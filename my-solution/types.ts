type ArrayScore = string[][];

export type Score = string | ArrayScore;

export interface RawMatch {
  sport: string;
  participant1?: string;
  participant2?: string;
  score?: Score;
}

export type ScoreFormatter = (score: Score) => string;

export interface SportsConfig {
  nameSeparator: string;
  formatScore: (score: Score) => string;
}
