// https://leetcode.com/problems/longest-palindromic-substring/
/**
 * string.substr(startIndex, length)
 * string.substring(startIndex, endIndexButNotIncluded)
 * Greedy is not always the best approach. Greedy is O(n^3)
 *
 * O(n^2)
 * 52% faster
 */

function longestPalindrome(s: string): string {
  let startIndexMax = 0,
    endIndexMax = 0;

  for (let i = 0; i < s.length - 1; i++) {
    let oddLenPalindrome = getMaxPalindrome(i, i);
    let evenLenPalindrome = getMaxPalindrome(i, i + 1) || [0, 0];

    updateIndexMaxValues(oddLenPalindrome);
    updateIndexMaxValues(evenLenPalindrome);
  }

  return s.substring(startIndexMax, endIndexMax + 1);

  function updateIndexMaxValues(value: [number, number]): void {
    if (endIndexMax - startIndexMax < value[1] - value[0]) {
      startIndexMax = value[0];
      endIndexMax = value[1];
    }
  }

  function getMaxPalindrome(
    startIndex: number,
    endIndex: number
  ): [number, number] | null {
    if (
      startIndex < 0 ||
      endIndex >= s.length ||
      s[startIndex] != s[endIndex]
    ) {
      return null;
    }

    let nextPalindrome = getMaxPalindrome(startIndex - 1, endIndex + 1);
    if (!nextPalindrome) {
      return [startIndex, endIndex];
    } else {
      return (
        getMaxPalindrome(nextPalindrome[0] - 1, nextPalindrome[1] + 1) ||
        nextPalindrome
      );
    }
  }
}

describe("longestPalindrome function", () => {
  it("returns correct answer for babad", () => {
    expect(longestPalindrome("babad")).toEqual("bab");
  });

  it("returns correct answer for cbbd", () => {
    expect(longestPalindrome("cbbd")).toEqual("bb");
  });

  it("returns correct answer for a", () => {
    expect(longestPalindrome("a")).toEqual("a");
  });

  it("returns correct answer for ac", () => {
    expect(longestPalindrome("ac")).toEqual("a");
  });
});
