import {
  passthroughFormatter,
  setBasedFormatter,
  basketballFormatter,
  SPORT_CONFIG,
} from './sportConfig';

describe('passthroughFormatter', () => {
  it('returns string score as-is', () => {
    expect(passthroughFormatter('2:1')).toBe('2:1');
    expect(passthroughFormatter('34:26')).toBe('34:26');
  });

  it('throws on non-string input', () => {
    expect(() => passthroughFormatter([['1:0']])).toThrow('expects a string');
  });
});

describe('setBasedFormatter', () => {
  it('formats volleyball score', () => {
    expect(setBasedFormatter('3:0,25:23,25:19,25:21')).toBe(
      'Main score: 3:0 (set1 25:23, set2 25:19, set3 25:21)',
    );
  });

  it('formats tennis score', () => {
    expect(setBasedFormatter('2:1,7:6,6:3,6:7')).toBe(
      'Main score: 2:1 (set1 7:6, set2 6:3, set3 6:7)',
    );
  });

  it('handles variable number of sets', () => {
    expect(setBasedFormatter('2:0,6:3,6:4')).toBe(
      'Main score: 2:0 (set1 6:3, set2 6:4)',
    );
  });

  it('throws on non-string input', () => {
    expect(() => setBasedFormatter([['1:0']])).toThrow('expects a string');
  });

  it('throws on single value without sets', () => {
    expect(() => setBasedFormatter('3:0')).toThrow('expects main score + sets');
  });
});

describe('basketballFormatter', () => {
  it('flattens 2D array to comma-separated string', () => {
    expect(
      basketballFormatter([
        ['9:7', '2:1'],
        ['5:3', '9:9'],
      ]),
    ).toBe('9:7,2:1,5:3,9:9');
  });

  it('throws on non-array input', () => {
    expect(() => basketballFormatter('2:1')).toThrow('expects an array');
  });
});

describe('SPORT_CONFIG', () => {
  it('has config for all 5 sports', () => {
    expect(Object.keys(SPORT_CONFIG)).toEqual(
      expect.arrayContaining(['soccer', 'volleyball', 'handball', 'basketball', 'tennis']),
    );
  });

  it('soccer uses dash separator', () => {
    expect(SPORT_CONFIG.soccer.nameSeparator).toBe(' - ');
  });

  it('tennis uses vs separator', () => {
    expect(SPORT_CONFIG.tennis.nameSeparator).toBe(' vs ');
  });

  it('handball uses vs separator', () => {
    expect(SPORT_CONFIG.handball.nameSeparator).toBe(' vs ');
  });
});
