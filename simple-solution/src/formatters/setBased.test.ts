import { setBasedFormatter } from './setBased';

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
