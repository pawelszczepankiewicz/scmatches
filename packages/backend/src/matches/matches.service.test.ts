import { MatchesService } from './matches.service';
import type { RawMatch } from '@sc-test/shared';

// Minimal mock to test formatMatch independently
const mockGateway = { broadcastScoreUpdate: jest.fn() };
const mockFirestore = {
  collection: jest.fn(),
  onSnapshot: jest.fn(),
};

describe('MatchesService.formatMatch', () => {
  let service: MatchesService;

  beforeEach(() => {
    service = new MatchesService(mockFirestore as any, mockGateway as any);
  });

  it('formats soccer match', () => {
    const result = service.formatMatch('1', {
      sport: 'soccer',
      participant1: 'Chelsea',
      participant2: 'Arsenal',
      score: '2:1',
      isLive: true,
    });

    expect(result).toEqual({
      id: '1',
      name: 'Chelsea - Arsenal',
      score: '2:1',
      sport: 'soccer',
      participant1: 'Chelsea',
      participant2: 'Arsenal',
      isLive: true,
    });
  });

  it('formats tennis match with sets', () => {
    const result = service.formatMatch('2', {
      sport: 'tennis',
      participant1: 'Maria Sharapova',
      participant2: 'Serena Williams',
      score: '2:1,7:6,6:3,6:7',
      isLive: true,
    });

    expect(result?.name).toBe('Maria Sharapova vs Serena Williams');
    expect(result?.score).toBe('Main score: 2:1 (set1 7:6, set2 6:3, set3 6:7)');
  });

  it('formats basketball with JSON-stringified array', () => {
    const result = service.formatMatch('3', {
      sport: 'basketball',
      participant1: 'GKS Tychy',
      participant2: 'GKS Katowice',
      score: JSON.stringify([['9:7', '2:1'], ['5:3', '9:9']]),
      isLive: false,
    });

    expect(result?.score).toBe('9:7,2:1,5:3,9:9');
  });

  it('returns null for unknown sport', () => {
    const result = service.formatMatch('4', {
      sport: 'ski jumping',
    } as RawMatch);

    expect(result).toBeNull();
  });

  it('returns null for missing participants', () => {
    const result = service.formatMatch('5', {
      sport: 'soccer',
      score: '1:0',
    } as RawMatch);

    expect(result).toBeNull();
  });
});
