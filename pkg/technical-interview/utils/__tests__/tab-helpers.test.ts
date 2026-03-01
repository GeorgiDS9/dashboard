import { checkBrackets, decrement } from '../tab-helpers';

// Tab 1
describe('tab 1: Counter decrement', () => {
  it('should decrement from 42 to 41', () => {
    expect(decrement(42)).toStrictEqual(41);
  });

  it('should decrement from 1 to 0', () => {
    expect(decrement(1)).toStrictEqual(0);
  });

  it('should not go below 0 when already at 0', () => {
    expect(decrement(0)).toStrictEqual(0);
  });

  it('should decrement from a large number', () => {
    expect(decrement(1000)).toStrictEqual(999);
  });
});

// Tab 5
describe('tab 5: Bracket validation', () => {
  // Valid pairs
  it('should return true for matching parentheses "()"', () => {
    expect(checkBrackets('()')).toStrictEqual(true);
  });

  it('should return true for multiple bracket types "{}[]()"', () => {
    expect(checkBrackets('{}[]()')).toStrictEqual(true);
  });

  it('should return true for nested brackets "[()]"', () => {
    expect(checkBrackets('[()]')).toStrictEqual(true);
  });

  // Invalid pairs
  it('should return false for mismatched brackets "(]"', () => {
    expect(checkBrackets('(]')).toStrictEqual(false);
  });

  it('should return false for overlapping brackets "([)]"', () => {
    expect(checkBrackets('([)]')).toStrictEqual(false);
  });

  // Edge cases
  it('should return true for empty string ""', () => {
    expect(checkBrackets('')).toStrictEqual(true);
  });

  it('should return false for only opening brackets "((("', () => {
    expect(checkBrackets('(((')).toStrictEqual(false);
  });

  it('should return false for only closing brackets ")))"', () => {
    expect(checkBrackets(')))')).toStrictEqual(false);
  });

  it('should return false for single opening bracket "("', () => {
    expect(checkBrackets('(')).toStrictEqual(false);
  });

  it('should return false for closing bracket first ")"', () => {
    expect(checkBrackets(')')).toStrictEqual(false);
  });

  it('should return true for non-bracket characters "a(b)c"', () => {
    expect(checkBrackets('a(b)c')).toStrictEqual(true);
  });
});
