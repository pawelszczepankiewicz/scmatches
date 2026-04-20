import { matches } from './matches';
import { parseMatch } from './eventParser';

const parsed = matches
  .map(parseMatch)
  .filter((result): result is NonNullable<typeof result> => result !== null);

console.log(parsed);
