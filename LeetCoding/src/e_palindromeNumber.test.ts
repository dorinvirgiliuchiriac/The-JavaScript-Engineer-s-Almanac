// https://leetcode.com/problems/palindrome-number/
/**
 * Don't need to check on every run, because we know for certain
 * that the chanse to be true is only after the while finishes.
 * This brought the execution time from 48% faster to 97%.
 *
 * O(n)
 * 97% faster
 */

function isPalindrome(x: number): boolean {
  if (x < 0 || (x !== 0 && x % 10 === 0)) {
    return false;
  }

  if (x < 10) {
    return true;
  }

  let reverse = 0;
  while (reverse < x) {
    reverse = reverse * 10 + (x % 10);
    x = Math.floor(x / 10);
  }

  return x === reverse || x === Math.floor(reverse / 10);
}

describe("isPalindrome function", () => {
  it("should return false for negative numbers", () => {
    expect(isPalindrome(-121)).toBeFalsy();
  });

  it("should return false for numbers that end in 0", () => {
    expect(isPalindrome(20)).toBeFalsy();
  });

  it("should return true for single digit numbers", () => {
    expect(isPalindrome(1)).toBeTruthy();
  });

  it("should return true for palindroms", () => {
    expect(isPalindrome(12321)).toBeTruthy();
    expect(isPalindrome(1221)).toBeTruthy();
  });

  it("should return false for non-palindroms", () => {
    expect(isPalindrome(1235421)).toBeFalsy();
    expect(isPalindrome(1231)).toBeFalsy();
  });
});
