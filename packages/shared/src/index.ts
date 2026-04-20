export type {
  SportType,
  StringScore,
  ArrayScore,
  Score,
  RawMatch,
  ParsedMatch,
  ScoreFormatter,
  SportConfig,
  ScoreUpdatePayload,
} from './types/match';

export {
  SPORT_CONFIG,
  passthroughFormatter,
  setBasedFormatter,
  basketballFormatter,
} from './config/sportConfig';
