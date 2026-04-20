import { passthroughFormatter } from './passthrough';

describe('passthroughFormatter', () => {
  it('returns the string score unchanged', () => {
    expect(passthroughFormatter('2:1')).toBe('2:1');
  });

  it('throws for non-string input', () => {
    expect(() => passthroughFormatter([['1:0']])).toThrow('expects a string');
  });
});
