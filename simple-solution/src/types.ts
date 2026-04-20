export type StringScore = string;
export type ArrayScore = string[][];
export type Score = StringScore | ArrayScore;

export interface RawMatch {
  sport: string;
  participant1?: string;
  participant2?: string;
  score?: Score | null;
}

export interface ParsedMatch {
  readonly name: string;
  readonly score: string;
}

export type ScoreFormatter = (score: Score) => string;

export interface SportConfig {
  nameSeparator: string;
  formatScore: ScoreFormatter;
}
