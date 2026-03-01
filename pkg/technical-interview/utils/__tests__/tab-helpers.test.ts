import {
  checkBrackets, decrement, getUpdatedDate, compareTime, swapJsonKeys
} from '../tab-helpers';

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

// Tab 2
describe('tab 2: Date and time', () => {
  const baseDate = new Date('2026-02-28T12:00:00');

  // Data offset calculation
  describe('data offset calculation', () => {
    it('should return the same date when no offset is applied', () => {
      const updated = getUpdatedDate(baseDate, 0, 0, 0);

      expect(updated.getTime()).toStrictEqual(baseDate.getTime());
    });

    it('should add hours correctly', () => {
      const updated = getUpdatedDate(baseDate, 2, 0, 0);

      expect(updated.getHours()).toStrictEqual(14);
    });

    it('should add minutes correctly', () => {
      const updated = getUpdatedDate(baseDate, 0, 30, 0);

      expect(updated.getMinutes()).toStrictEqual(30);
    });

    it('should add seconds correctly', () => {
      const updated = getUpdatedDate(baseDate, 0, 0, 45);

      expect(updated.getSeconds()).toStrictEqual(45);
    });

    it('should subtract time with negative offsets', () => {
      const updated = getUpdatedDate(baseDate, -1, 0, 0);

      expect(updated.getHours()).toStrictEqual(11);
    });

    it('should not mutate the original date', () => {
      const original = new Date('2026-02-28T12:00:00');

      getUpdatedDate(original, 5, 30, 15);
      expect(original.getTime()).toStrictEqual(new Date('2026-02-28T12:00:00').getTime());
    });
  });

  // Time comparison
  describe('time comparison', () => {
    it('should return "same" when dates are equal', () => {
      const updated = getUpdatedDate(baseDate, 0, 0, 0);

      expect(compareTime(baseDate, updated)).toStrictEqual('same');
    });

    it('should return "before" when updated is in the future', () => {
      const updated = getUpdatedDate(baseDate, 1, 0, 0);

      expect(compareTime(baseDate, updated)).toStrictEqual('before');
    });

    it('should return "after" when updated is in the past', () => {
      const updated = getUpdatedDate(baseDate, -1, 0, 0);

      expect(compareTime(baseDate, updated)).toStrictEqual('after');
    });
  });
});

// Tab 3
describe('tab 3: JSON key-value swap', () => {
  it('should swap string values with their keys', () => {
    const input = { name: 'Alice', role: 'admin' };

    expect(swapJsonKeys(input)).toStrictEqual({ Alice: 'name', admin: 'role' });
  });

  it('should swap number values with their keys', () => {
    const input = { age: 30, score: 100 };

    expect(swapJsonKeys(input)).toStrictEqual({ 30: 'age', 100: 'score' });
  });

  it('should swap boolean values with their keys', () => {
    const input = { active: true, deleted: false };

    expect(swapJsonKeys(input)).toStrictEqual({ true: 'active', false: 'deleted' });
  });

  it('should swap null values with their keys', () => {
    const input = { data: null };

    expect(swapJsonKeys(input)).toStrictEqual({ null: 'data' });
  });

  it('should keep objects as is', () => {
    const input = { user: { name: 'Alice' } };

    expect(swapJsonKeys(input)).toStrictEqual({ user: { name: 'Alice' } });
  });

  it('should keep arrays as is', () => {
    const input = { tags: ['a', 'b'] };

    expect(swapJsonKeys(input)).toStrictEqual({ tags: ['a', 'b'] });
  });

  it('should handle mixed primitive and non-primitive values', () => {
    const input = {
      name: 'Alice', age: 30, address: { city: 'London' }
    };

    expect(swapJsonKeys(input)).toStrictEqual({
      Alice: 'name', 30: 'age', address: { city: 'London' }
    });
  });

  it('should return an empty object for empty input', () => {
    expect(swapJsonKeys({})).toStrictEqual({});
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
