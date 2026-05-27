// Issue #1: No type safety - plain JavaScript with no guarantees on data shapes
// Issue #2: Use of `var` - `var` instead of `let`/`const` leads to confusing scoping
// Issue #3: No tests - no test coverage, changes can easily introduce regressions
var matches = [
  {
    sport: "soccer",
    participant1: "Chelsea",
    participant2: "Arsenal",
    score: "2:1",
  },
  {
    sport: "volleyball",
    participant1: "Germany",
    participant2: "France",
    score: "3:0,25:23,25:19,25:21",
  },
  {
    sport: "handball",
    participant1: "Pogoń Szczecin",
    participant2: "Azoty Puławy",
    score: "34:26",
  },
  {
    sport: "basketball",
    participant1: "GKS Tychy",
    participant2: "GKS Katowice",
    score: [
      ["9:7", "2:1"],
      ["5:3", "9:9"],
    ],
  },
  {
    sport: "tennis",
    participant1: "Maria Sharapova",
    participant2: "Serena Williams",
    score: "2:1,7:6,6:3,6:7",
  },
  {
    sport: "ski jumping",
    // Issue #4: Missing validation - participant data is missing, output will contain `undefined`
  },
];

// Issue #5: Unnecessary object creation - stateless class instantiated inside a loop
// Issue #6: Hard to extend - adding a new sport means modifying multiple parts of the code
class EventParser {
  // Issue #7: Repeated if/else logic - branches on sport value, duplicated with formatScore()
  makeEventName(match) {
    if (match.sport === "soccer") {
      return match.participant1 + " - " + match.participant2;
    } else if (match.sport === "tennis") {
      return match.participant1 + " vs " + match.participant2;
    } else if (match.sport === "volleyball") {
      return match.participant1 + " - " + match.participant2;
    } else if (match.sport === "handball") {
      return match.participant1 + " vs " + match.participant2;
    } else if (match.sport === "basketball") {
      return match.participant1 + " - " + match.participant2;
    } else {
      // Issue #8: Error handling via strings - returns a string instead of throwing a proper error
      return "Exception: invalid sport";
    }
  }

  // Issue #7: Repeated if/else logic - branches on sport value, duplicated with makeEventName()
  formatScore(match) {
    if (match.sport === "soccer") {
      return match.score;
    } else if (match.sport === "tennis") {
      // Issue #9: Duplicate code - tennis and volleyball handling are copy-pasted
      // Issue #10: Overly rigid regex - assumes exactly 4 sets, breaks if format changes
      // Issue #2: Use of `var` - `var` instead of `let`/`const`
      var scores =
        /([0-9]+\:[0-9]+),([0-9]+\:[0-9]+),([0-9]+\:[0-9]+),([0-9]+\:[0-9]+)/.exec(
          match.score,
        );
      var set1 = scores[2];
      var set2 = scores[3];
      var set3 = scores[4];

      return (
        "Main score: " +
        scores[1] +
        " (" +
        "set1 " +
        set1 +
        ", " +
        "set2 " +
        set2 +
        ", " +
        "set3 " +
        set3 +
        ")"
      );
    } else if (match.sport === "volleyball") {
      // Issue #9: Duplicate code - volleyball is copy-pasted from tennis
      // Issue #10: Overly rigid regex - assumes exactly 4 sets, breaks if format changes
      // Issue #2: Use of `var` - `var` instead of `let`/`const`
      var scores =
        /([0-9]+\:[0-9]+),([0-9]+\:[0-9]+),([0-9]+\:[0-9]+),([0-9]+\:[0-9]+)/.exec(
          match.score,
        );
      var set1 = scores[2];
      var set2 = scores[3];
      var set3 = scores[4];

      return (
        "Main score: " +
        scores[1] +
        " (" +
        "set1 " +
        set1 +
        ", " +
        "set2 " +
        set2 +
        ", " +
        "set3 " +
        set3 +
        ")"
      );
    } else if (match.sport === "basketball") {
      // Issue #11: Hardcoded indexing - relies on fixed array positions, breaks if structure changes
      return (
        match.score[0][0] +
        "," +
        match.score[0][1] +
        "," +
        match.score[1][0] +
        "," +
        match.score[1][1]
      );
    } else if (match.sport === "handball") {
      return match.score;
    } else {
      // Issue #8: Error handling via strings - returns a string instead of throwing a proper error
      return "Exception: invalid sport";
    }
  }
}

let matchesParsed = [];

// Issue #12: Imperative looping style - manual loop with push instead of .map()/.filter()
// Issue #2: Use of `var` - `var` used for loop variable
for (var i = 0; i < matches.length; i++) {
  // Issue #5: Unnecessary object creation - new EventParser() on every iteration despite being stateless
  let parser = new EventParser();
  let name = parser.makeEventName(matches[i]);
  let score = parser.formatScore(matches[i]);

  // Issue #8: Error handling via strings - filtering by comparing against magic string
  if (
    name !== "Exception: invalid sport" &&
    score !== "Exception: invalid sport"
  ) {
    matchesParsed.push({
      name,
      score,
    });
  }
}

console.log(matchesParsed);
