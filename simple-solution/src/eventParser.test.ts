import { parseMatch } from './eventParser';
import { matches } from './matches';
import { passthroughFormatter } from './formatters/passthrough';
import { setBasedFormatter } from './formatters/setBased';
import { basketballFormatter } from './formatters/basketball';
import type { RawMatch } from './types';

describe('parseMatch', () => {
  it('formats soccer match with dash separator', () => {
    const match: RawMatch = { sport: 'soccer', participant1: 'Chelsea', participant2: 'Arsenal', score: '2:1' };
    expect(parseMatch(match)).toEqual({ name: 'Chelsea - Arsenal', score: '2:1' });
  });

  it('formats volleyball with set-based score', () => {
    const match: RawMatch = { sport: 'volleyball', participant1: 'Germany', participant2: 'France', score: '3:0,25:23,25:19,25:21' };
    expect(parseMatch(match)).toEqual({
      name: 'Germany - France',
      score: 'Main score: 3:0 (set1 25:23, set2 25:19, set3 25:21)',
    });
  });

  it('formats handball with vs separator', () => {
    const match: RawMatch = { sport: 'handball', participant1: 'Pogoń Szczecin', participant2: 'Azoty Puławy', score: '34:26' };
    expect(parseMatch(match)).toEqual({ name: 'Pogoń Szczecin vs Azoty Puławy', score: '34:26' });
  });

  it('formats basketball from 2D array', () => {
    const match: RawMatch = { sport: 'basketball', participant1: 'GKS Tychy', participant2: 'GKS Katowice', score: [['9:7', '2:1'], ['5:3', '9:9']] };
    expect(parseMatch(match)).toEqual({ name: 'GKS Tychy - GKS Katowice', score: '9:7,2:1,5:3,9:9' });
  });

  it('formats tennis with vs separator and sets', () => {
    const match: RawMatch = { sport: 'tennis', participant1: 'Maria Sharapova', participant2: 'Serena Williams', score: '2:1,7:6,6:3,6:7' };
    expect(parseMatch(match)).toEqual({
      name: 'Maria Sharapova vs Serena Williams',
      score: 'Main score: 2:1 (set1 7:6, set2 6:3, set3 6:7)',
    });
  });

  it('returns null for unknown sport', () => {
    expect(parseMatch({ sport: 'ski jumping' })).toBeNull();
  });

  it('returns null for missing participants', () => {
    expect(parseMatch({ sport: 'soccer', score: '1:0' })).toBeNull();
  });

  it('returns null for missing score', () => {
    expect(parseMatch({ sport: 'soccer', participant1: 'A', participant2: 'B' })).toBeNull();
  });

  it('returns null for null score', () => {
    expect(parseMatch({ sport: 'soccer', participant1: 'A', participant2: 'B', score: null })).toBeNull();
  });

  it('produces the exact same output as the original app.js', () => {
    const result = matches
      .map(parseMatch)
      .filter((r): r is NonNullable<typeof r> => r !== null);

    expect(result).toEqual([
      { name: 'Chelsea - Arsenal', score: '2:1' },
      { name: 'Germany - France', score: 'Main score: 3:0 (set1 25:23, set2 25:19, set3 25:21)' },
      { name: 'Pogoń Szczecin vs Azoty Puławy', score: '34:26' },
      { name: 'GKS Tychy - GKS Katowice', score: '9:7,2:1,5:3,9:9' },
      { name: 'Maria Sharapova vs Serena Williams', score: 'Main score: 2:1 (set1 7:6, set2 6:3, set3 6:7)' },
    ]);
  });
});

describe('formatters', () => {
  describe('passthroughFormatter', () => {
    it('returns the string score unchanged', () => {
      expect(passthroughFormatter('2:1')).toBe('2:1');
    });

    it('throws for non-string input', () => {
      expect(() => passthroughFormatter([['1:0']])).toThrow('expects a string');
    });
  });

  describe('setBasedFormatter', () => {
    it('formats main score with set details', () => {
      expect(setBasedFormatter('3:0,25:23,25:19,25:21')).toBe('Main score: 3:0 (set1 25:23, set2 25:19, set3 25:21)');
    });

    it('handles 5-set match', () => {
      expect(setBasedFormatter('3:2,25:23,19:25,25:20,22:25,15:10')).toBe(
        'Main score: 3:2 (set1 25:23, set2 19:25, set3 25:20, set4 22:25, set5 15:10)',
      );
    });

    it('throws for score with no sets', () => {
      expect(() => setBasedFormatter('3:0')).toThrow('expects main score + sets');
    });

    it('throws for non-string input', () => {
      expect(() => setBasedFormatter([['1:0']])).toThrow('expects a string');
    });
  });

  describe('basketballFormatter', () => {
    it('flattens 2D array into comma-separated string', () => {
      expect(basketballFormatter([['9:7', '2:1'], ['5:3', '9:9']])).toBe('9:7,2:1,5:3,9:9');
    });

    it('throws for string input', () => {
      expect(() => basketballFormatter('9:7')).toThrow('expects an array');
    });
  });
});
