// Tab 1
export const decrement = (counter: number): number => {
  if (counter > 0) {
    return counter - 1;
  }

  return counter;
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
