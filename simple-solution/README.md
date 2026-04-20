# Issues in `app.js`

## 1. Repeated if/else logic

Both `makeEventName()` and `formatScore()` branch on the same sport value. So every time you add a new sport, you have to update both places. Two sources of truth - not S(O)LID solution I would say.

### Fix:

Introduced a `SPORT_CONFIG` record in `sportConfig.ts` that maps each sport to its `nameSeparator` and `formatScore` function. Both pieces of sport specific logic live in one place - add a sport, add one config entry, done.

## 2. Duplicate code

The tennis and volleyball handling in `formatScore()` are basically copy-pasted. Same logic, same structure. Fix it in one place, forget the other, welcome Mr. Bug.

### Fix:

Extracted a shared `setBasedFormatter` used by both tennis and volleyball. The duplicated logic now lives in a single function (`formatters/setBased.ts`), and each sport simply references it in its config.

## 3. Overly rigid regex

The regex used for parsing scores assumes a fixed number of sets. If the format changes (like longer matches), it just stops working and fails. I guess we can change the rules of the sport to fit solution :D

### Fix:

Replaced the regex with a simple `score.split(‘,’)` approach in `setBasedFormatter`. It handles any number of sets dynamically - no assumptions about match length.

## 4. Hardcoded indexing

The basketball logic relies on fixed array positions. It only works as long as the data looks exactly the same. One small change in structure and the whole thing politely explodes 💥.

### Fix:

The `basketballFormatter` uses `.flat().join(‘,’)` to flatten the score array generically, instead of accessing fixed indices. Works regardless of how many periods the data contains.

## 5. Error handling via strings

Instead of throwing errors or handling them properly, the code returns a string like `"Exception: invalid sport"` and then filters it out later. At least we never have errors in app, approved (ok ok, added some error handling).

### Fix:

Formatters now `throw` proper `Error` objects on invalid input. `parseMatch()` catches these and returns `null`, which the caller filters out. Consistent strategy: bad data → `null` → filtered, no magic strings pretending to be errors.

## 6. No type safety

Since it’s plain JavaScript, there’s no guarantee what shape `match.score` actually has. I summon the TypeScript gods.

### Fix:

Rewrote the solution in TypeScript with explicit types (`RawMatch`, `ParsedMatch`, `Score`, `ScoreFormatter`, `SportConfig`). The compiler now catches type mismatches at build time instead of at 3 AM in production.

## 7. Use of `var`

`var` is used instead of `let` or `const`, which can lead to confusing scoping behavior. A small time capsule from 2010. I am not that senior, lets change that.

### Fix:

All declarations use `const` (or `let` where reassignment is needed). TypeScript’s strict mode and `readonly` modifiers reinforce immutability throughout.

## 8. Unnecessary object creation

A new `EventParser` is created inside the loop even though it doesn’t keep any state. Winnncyj obiektów, garbage collection can handle it.

### Fix:

Replaced the stateless class with a plain function `parseMatch()`. No instantiation needed - it’s just a function call. The garbage collector is happy.

## 9. Missing validation

If participant data is missing, the output ends up containing `undefined`. So we can have output like `Team A vs undefined`. And `undefined` is my favorite sports team.

### Fix:

`parseMatch()` checks for missing `participant1`, `participant2`, and `score` upfront and returns `null` before attempting any formatting. `undefined` sport team has ended it's career.

## 10. Imperative looping style

The code uses a manual loop and pushes into an array. It works, but lets use some mysterious JS functions like `.map()` and `.filter()`.

### Fix:

Replaced the manual loop with `matches.map(parseMatch).filter(...)`. Concise, and the intent is immediately clear.

## 11. No tests

There’s no test coverage, so changes can easily introduce regressions. We like our QA team, lets make their life easier.

### Fix:

Added `eventParser.test.ts` with unit tests for each formatter, integration tests for `parseMatch()` across all sports, and validation tests for null/missing data cases.

## 12. Hard to extend

Adding a new sport means modifying multiple parts of the code. Simple change, multiple touchpoints - only good when paid per line of code written.

### Fix:

Adding a new sport is now a single entry in `SPORT_CONFIG` - pick a separator, pick (or write) a formatter, done. No other files need to change.
