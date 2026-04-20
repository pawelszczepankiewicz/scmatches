import { basketballFormatter } from './basketball';

describe('basketballFormatter', () => {
  it('flattens 2D array into comma-separated string', () => {
    expect(basketballFormatter([['9:7', '2:1'], ['5:3', '9:9']])).toBe('9:7,2:1,5:3,9:9');
  });

  it('throws for string input', () => {
    expect(() => basketballFormatter('9:7')).toThrow('expects an array');
  });
});
