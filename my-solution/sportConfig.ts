import { Score, ScoreFormatter, SportsConfig } from "./types";

const soccerScoreFormatter: ScoreFormatter = (score: Score): string => {
  return score.toString();
};
const tennisScoreFormatter: ScoreFormatter = (score: Score): string => {
  return score.toString();
};
const volleyballScoreFormatter: ScoreFormatter = (score: Score): string => {
  return score.toString();
};
const handballScoreFormatter: ScoreFormatter = (score: Score): string => {
  return score.toString();
};
const basketballScoreFormatter: ScoreFormatter = (score: Score): string => {
  return score.toString();
};

export const SPORT_CONFIG: Readonly<Record<string, SportsConfig>> = {
  soccer: { nameSeparator: " - ", formatScore: soccerScoreFormatter },
  tennis: { nameSeparator: " - ", formatScore: tennisScoreFormatter },
  volleyball: { nameSeparator: " - ", formatScore: volleyballScoreFormatter },
  handball: { nameSeparator: " - ", formatScore: handballScoreFormatter },
  basketball: { nameSeparator: " - ", formatScore: basketballScoreFormatter },
};
