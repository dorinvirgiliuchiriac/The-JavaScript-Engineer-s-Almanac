// https://leetcode.com/problems/hamming-distance/
/**
 * O(n)
 * 96.61% faster
 */

function hammingDistance(x: number, y: number): number {
  let diff = x ^ y;

  return countSetBits(diff);
}

function countSetBits(n: number): number {
  let count = 0;

  while (n) {
    if (n & 1) {
      count++;
    }
    n >>= 1;
  }

  return count;
}

describe("hammingDistance function", () => {
  it("returns correct answer for 1 and 4", () => {
    expect(hammingDistance(1, 4)).toEqual(2);
  });

  it("returns correct answer for 3 and 1", () => {
    expect(hammingDistance(3, 1)).toEqual(1);
  });
});
