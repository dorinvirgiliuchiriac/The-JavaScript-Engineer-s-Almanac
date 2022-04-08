// https://leetcode.com/problems/single-element-in-a-sorted-array/
/**
 * O(log(n))
 * 100% faster
 */

function singleNonDuplicate(nums: number[]): number {
  if (nums.length <= 1) {
    return nums[0];
  }

  return findNonDuplicateNumber(0, nums.length - 1);

  function findNonDuplicateNumber(
    startIndex: number,
    endIndex: number
  ): number {
    let middleIndex = Math.floor((startIndex + endIndex) / 2);
    let middleNumber = nums[middleIndex];
    let leftNumber = nums[middleIndex - 1];
    let rightNumber = nums[middleIndex + 1];

    if (middleNumber !== leftNumber && middleNumber !== rightNumber) {
      return middleNumber;
    }

    if (middleNumber === leftNumber) {
      if (hasEvenNumberOfElementBetween(startIndex, middleIndex)) {
        return findNonDuplicateNumber(middleIndex + 1, endIndex);
      } else {
        return findNonDuplicateNumber(startIndex, middleIndex - 2);
      }
    } else {
      if (hasEvenNumberOfElementBetween(middleIndex, endIndex)) {
        return findNonDuplicateNumber(startIndex, middleIndex - 1);
      } else {
        return findNonDuplicateNumber(middleIndex + 2, endIndex);
      }
    }
  }
}

function hasEvenNumberOfElementBetween(start: number, end: number): boolean {
  return (end - start + 1) % 2 === 0;
}

describe("singleNonDuplicate function", () => {
  it("returns correct answer for [1]", () => {
    expect(singleNonDuplicate([1])).toEqual(1);
  });

  it("returns correct answer for [1,1,2,3,3,4,4,8,8]", () => {
    expect(singleNonDuplicate([1, 1, 2, 3, 3, 4, 4, 8, 8])).toEqual(2);
  });

  it("returns correct answer for [3,3,7,7,10,11,11]", () => {
    expect(singleNonDuplicate([3, 3, 7, 7, 10, 11, 11])).toEqual(10);
  });
});
