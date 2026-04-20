import type { SportConfig } from './types';
import { passthroughFormatter } from './formatters/passthrough';
import { setBasedFormatter } from './formatters/setBased';
import { basketballFormatter } from './formatters/basketball';

export const SPORT_CONFIG: Readonly<Record<string, SportConfig>> = {
  soccer:     { nameSeparator: ' - ', formatScore: passthroughFormatter },
  volleyball: { nameSeparator: ' - ', formatScore: setBasedFormatter },
  handball:   { nameSeparator: ' vs ', formatScore: passthroughFormatter },
  basketball: { nameSeparator: ' - ', formatScore: basketballFormatter },
  tennis:     { nameSeparator: ' vs ', formatScore: setBasedFormatter },
};
