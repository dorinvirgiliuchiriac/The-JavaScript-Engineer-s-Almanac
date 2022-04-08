// https://leetcode.com/problems/two-sum/
/**
 * Start using predefined object types for specific scenarios
 * E.g. Map, Set
 *
 * O(n)
 * 94% faster
 */

function twoSum(nums: number[], target: number): number[] {
  let indexedValues = new Map<number, number>([[nums[0], 0]]);

  for (let index = 1; index < nums.length; index++) {
    let value = nums[index];
    let pairValue = target - value;
    let pairValueIndex = indexedValues.get(pairValue);

    if (pairValueIndex !== undefined) {
      return [pairValueIndex, index];
    }

    indexedValues.set(value, index);
  }

  return [];
}

describe("twoSum function", () => {
  it("returns correct answer for [2, 7, 11, 15], 9", () => {
    expect(twoSum([2, 7, 11, 15], 9)).toEqual([0, 1]);
  });

  it("returns correct answer for [3, 2, 4], 6", () => {
    expect(twoSum([3, 2, 4], 6)).toEqual([1, 2]);
  });

  it("returns correct answer for [3, 3], 6", () => {
    expect(twoSum([3, 3], 6)).toEqual([0, 1]);
  });
});
