// Tab 1
export const decrement = (counter: number): number => {
  if (counter > 0) {
    return counter - 1;
  }

  return counter;
};

// Tab 2
export type TimeComparison = 'before' | 'same' | 'after';

export const getUpdatedDate = (
  current: Date,
  offsetHours: number,
  offsetMinutes: number,
  offsetSeconds: number
): Date => {
  const newDate = new Date(current);

  newDate.setHours(newDate.getHours() + offsetHours);
  newDate.setMinutes(newDate.getMinutes() + offsetMinutes);
  newDate.setSeconds(newDate.getSeconds() + offsetSeconds);

  return newDate;
};

export const compareTime = (current: Date, updated: Date): TimeComparison => {
  const a = current.getTime();
  const b = updated.getTime();

  if (a < b) return 'before';
  if (a > b) return 'after';

  return 'same';
};

// Tab 3
export const swapJsonKeys = (obj: Record<string, unknown>): Record<string, unknown> => {
  const result: Record<string, unknown> = {};

  for (const key in obj) {
    const value = obj[key];

    if (
      value === null ||
        typeof value === 'string' ||
        typeof value === 'number' ||
        typeof value === 'boolean'
    ) {
      result[String(value)] = key;
    } else {
      result[key] = value;
    }
  }

  return result;
};

// Tab 5
export function checkBrackets(str: string): boolean {
  const stack: string[] = [];

  const pairs: Record<string, string> = {
    ')': '(',
    ']': '[',
    '}': '{'
  };

  for (const char of str) {
    if (char === '(' || char === '[' || char === '{') {
      stack.push(char);
    } else if (char in pairs) {
      const last = stack.pop();

      if (last !== pairs[char]) {
        return false;
      }
    }
  }

  return stack.length === 0;
}
