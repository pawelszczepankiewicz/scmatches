import { RawMatch } from "./types";
import { SPORT_CONFIG } from "./sportConfig";

export const parseMatch = (match: RawMatch) => {
  const config = SPORT_CONFIG[match.sport];

  if (
    !config ||
    !match.participant1 ||
    !match.participant2 ||
    match.score == null
  ) {
    return null;
  }

  const name = `${match.participant1}${config.nameSeparator}${match.participant2}`;

  try {
    const score = config.formatScore(match.score);
    return { name, score };
  } catch {
    return null;
  }
};
