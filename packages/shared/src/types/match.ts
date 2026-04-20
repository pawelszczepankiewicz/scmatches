export type SportType = 'soccer' | 'volleyball' | 'handball' | 'basketball' | 'tennis';

export type StringScore = string;
export type ArrayScore = string[][];
export type Score = StringScore | ArrayScore;

export interface RawMatch {
  sport: string;
  participant1?: string;
  participant2?: string;
  score?: Score;
}

export interface ParsedMatch {
  id: string;
  name: string;
  score: string;
  sport: SportType;
  participant1: string;
  participant2: string;
  isLive: boolean;
}

export type ScoreFormatter = (score: Score) => string;

export interface SportConfig {
  nameSeparator: string;
  formatScore: ScoreFormatter;
}

export interface ScoreUpdatePayload {
  matchId: string;
  score: Score;
}
