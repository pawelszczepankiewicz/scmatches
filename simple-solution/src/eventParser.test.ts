import { parseMatch } from './eventParser';
import type { RawMatch } from './types';

describe('parseMatch – validation', () => {
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
});

describe('parseMatch – formatting per sport', () => {
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
});
