// https://leetcode.com/problems/longest-substring-without-repeating-characters/
/**
 * O(n)
 * 99.82% faster
 */

function lengthOfLongestSubstring(s: string): number {
  if (!s) {
    return 0;
  }

  let maxLength = 1;
  let start = 0;
  let counter = new Map<string, number>([[s[0], 0]]);
  let currentLength = 1;

  for (let i = 1; i < s.length; i++) {
    let prevPos = counter.get(s[i]);
    if (prevPos != null && prevPos >= start) {
      start = prevPos + 1;
      currentLength = i - start;
    }

    counter.set(s[i], i);
    currentLength++;

    if (currentLength > maxLength) {
      maxLength = currentLength;
    }
  }

  return maxLength;
}

describe("lengthOfLongestSubstring function", () => {
  it("returns correct answer for abcd", () => {
    expect(lengthOfLongestSubstring("abcd")).toEqual(4);
  });

  it("returns correct answer for abcaxcbb", () => {
    expect(lengthOfLongestSubstring("abcaxybb")).toEqual(5);
  });

  it("returns correct answer for abcabcbb", () => {
    expect(lengthOfLongestSubstring("abcabcbb")).toEqual(3);
  });

  it("returns correct answer for bbbbb", () => {
    expect(lengthOfLongestSubstring("bbbbb")).toEqual(1);
  });

  it("returns correct answer for pwwkew", () => {
    expect(lengthOfLongestSubstring("pwwkew")).toEqual(3);
  });

  it("returns correct answer for x", () => {
    expect(lengthOfLongestSubstring("x")).toEqual(1);
  });

  it("returns correct answer for empty string", () => {
    expect(lengthOfLongestSubstring("")).toEqual(0);
  });
});
