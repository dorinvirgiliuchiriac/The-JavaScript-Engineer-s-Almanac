// https://leetcode.com/problems/reverse-integer/
/**
 * Pay more attention to the question. When reversing
 * a number, it might be greater than the limits imposed
 * by the problem. 123456789 vs 987654321
 *
 * O(n)
 * 60% faster
 */

const MIN_RESULT = -Math.pow(2, 31);
const MAX_RESULT = Math.pow(2, 31) - 1;

function reverse(x: number): number {
  let ans = 0;
  while (x !== 0) {
    let value = x % 10;
    let maxCurentResult = (MAX_RESULT - value) / 10;
    let minCurentResult = (MIN_RESULT - value) / 10;

    if (ans > maxCurentResult || ans < minCurentResult) {
      return 0;
    }

    ans = ans * 10 + value;
    x = round(x / 10);
  }

  return ans;
}

function round(x: number): number {
  return x < 0 ? Math.ceil(x) : Math.floor(x);
}

describe("reverse function", () => {
  it("works with positive numbers", () => {
    expect(reverse(123)).toEqual(321);
    expect(reverse(120)).toEqual(21);
    expect(reverse(0)).toEqual(0);
  });

  it("works with negative numbers", () => {
    expect(reverse(-123)).toEqual(-321);
    expect(reverse(-120)).toEqual(-21);
  });

  it("returns 0 for big numbers", () => {
    expect(reverse(2147483646)).toEqual(0);
  });
});

describe("round function", () => {
  it("rounds with ceil negative numbers", () => {
    expect(round(-5.8)).toEqual(-5);
  });

  it("rounds with floor positive numbers", () => {
    expect(round(5.8)).toEqual(5);
  });
});
