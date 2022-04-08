// https://leetcode.com/problems/longest-common-prefix/
/**
 * !! Pay attention to the question !! It asked for a prefix,
 * not any common string, anywhere in the string.
 *
 * O(n^2)
 * 97.66% faster
 */

function longestCommonPrefix(strs: string[]): string {
  let ans = getShortestStr();

  for (let str of strs) {
    ans = getCommonPref(ans, str);
  }

  return ans;

  function getShortestStr(): string {
    return strs.reduce(getShorterStr);
  }
}

function getShorterStr(s1: string, s2: string): string {
  return s1.length > s2.length ? s2 : s1;
}

function getCommonPref(s1: string, s2: string): string {
  let source = getShorterStr(s1, s2);
  let target = s1 == source ? s2 : s1;

  for (
    var count = 0;
    count < source.length && source[count] == target[count];
    count++
  ) {}

  return source.substring(0, count);
}

describe("longestCommonPrefix function", () => {
  it('returns correct answer for ["flower","flow","flight"]', () => {
    expect(longestCommonPrefix(["flower", "flow", "flight"])).toEqual("fl");
  });

  it('returns correct answer for ["dog","racecar","car"]', () => {
    expect(longestCommonPrefix(["dog", "racecar", "car"])).toEqual("");
  });

  it('returns correct answer for ["reflower","flow","flight"]', () => {
    expect(longestCommonPrefix(["reflower", "flow", "flight"])).toEqual("");
  });
});
