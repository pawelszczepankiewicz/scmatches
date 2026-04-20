export interface Problem {
  title: string;
  description: string;
  fix: string;
}

export const PROBLEMS: Problem[] = [
  {
    title: 'Repeated if/else logic',
    description:
      'Both makeEventName() and formatScore() branch on the same sport value. Every new sport requires updating both places.',
    fix: 'Introduced a SPORT_CONFIG record that maps each sport to its nameSeparator and formatScore function. One map, one source of truth.',
  },
  {
    title: 'Duplicate code',
    description:
      'Tennis and volleyball handling in formatScore() are basically copy-pasted. Same logic, same structure.',
    fix: 'Extracted a shared setBasedFormatter used by both tennis and volleyball.',
  },
  {
    title: 'Overly rigid regex',
    description:
      'The regex assumes a fixed number of sets. If the format changes, it stops working silently.',
    fix: 'Replaced the regex with score.split(",") — handles any number of sets dynamically.',
  },
  {
    title: 'Hardcoded indexing',
    description:
      'Basketball logic relies on fixed array positions. One structural change and it breaks.',
    fix: 'The basketballFormatter uses .flat().join(",") to flatten the array generically.',
  },
  {
    title: 'Error handling via strings',
    description:
      'Returns "Exception: invalid sport" as a string and filters it out later. No actual error handling.',
    fix: 'Formatters throw proper errors. parseMatch() catches them and returns null, which the caller filters out.',
  },
  {
    title: 'No type safety',
    description:
      'Plain JavaScript — no guarantee what shape match.score actually has.',
    fix: 'Rewrote in TypeScript with explicit types (RawMatch, ParsedMatch, Score, ScoreFormatter, SportConfig).',
  },
  {
    title: 'Use of var',
    description:
      'var instead of let/const leads to confusing scoping behavior.',
    fix: 'All declarations use const (or let where reassignment is needed). TypeScript strict mode enforces immutability.',
  },
  {
    title: 'Unnecessary object creation',
    description:
      'A new EventParser is created inside the loop even though it has no state.',
    fix: 'Replaced the stateless class with a plain parseMatch() function. No instantiation needed.',
  },
  {
    title: 'Missing validation',
    description:
      'If participant data is missing, the output contains "undefined". Team undefined — fan favorite.',
    fix: 'parseMatch() checks for missing participant1, participant2, and score upfront, returns null before formatting.',
  },
  {
    title: 'Imperative looping style',
    description:
      'Manual for loop with array push. Works, but not idiomatic.',
    fix: 'Replaced with matches.map(parseMatch).filter(...) — concise and intent is immediately clear.',
  },
  {
    title: 'No tests',
    description:
      'No test coverage. Changes can easily introduce regressions.',
    fix: 'Added 18 unit tests covering each formatter, parseMatch for all sports, and validation edge cases.',
  },
  {
    title: 'Hard to extend',
    description:
      'Adding a new sport means modifying multiple parts of the code.',
    fix: 'Adding a new sport is now a single entry in SPORT_CONFIG — pick a separator, pick a formatter, done.',
  },
];
