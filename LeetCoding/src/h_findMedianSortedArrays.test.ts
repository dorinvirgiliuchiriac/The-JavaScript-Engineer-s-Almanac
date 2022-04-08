// https://leetcode.com/problems/median-of-two-sorted-arrays/
/**
 * O(log(n+m))
 * 84.71% faster
 */

function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
  if (nums1.length == 0) {
    return getMedianOf(nums2);
  }

  if (nums2.length == 0) {
    return getMedianOf(nums1);
  }

  let sum = nums1.length + nums2.length;
  let sumMiddleIndex = getMiddleIndexOf(sum);

  let ans = getMedianFor(nums1, nums2, 0, nums1.length - 1);

  return ans != null ? ans : getMedianFor(nums2, nums1, 0, nums2.length - 1);

  function getMedianFor(
    nums1: number[],
    nums2: number[],
    startIndex: number,
    endIndex: number
  ): number | null {
    if (startIndex > endIndex) {
      return null;
    }

    let middleIndex = Math.floor((startIndex + endIndex) / 2);
    let middleNumber = nums1[middleIndex];
    let middleIndexDeviation = sumMiddleIndex - middleIndex;

    if (middleIndexDeviation < 0) {
      return getMedianFor(nums1, nums2, startIndex, middleIndex - 1);
    }

    if (middleIndexDeviation > nums2.length) {
      return getMedianFor(nums1, nums2, middleIndex + 1, endIndex);
    }

    if (
      (middleIndexDeviation == 0 && middleNumber <= nums2[0]) ||
      (middleNumber >= nums2[middleIndexDeviation - 1] &&
        (nums2.length === middleIndexDeviation ||
          middleNumber <= nums2[middleIndexDeviation]))
    ) {
      if (sum % 2 == 0) {
        let minRightNumber = getMedianMinOf(
          nums1[middleIndex + 1],
          nums2[middleIndexDeviation]
        );
        return getMedianSum(middleNumber, minRightNumber);
      } else {
        return middleNumber;
      }
    }

    if (
      middleNumber >
      nums2[middleIndexDeviation - Number(middleIndexDeviation > 0)]
    ) {
      return getMedianFor(nums1, nums2, startIndex, middleIndex - 1);
    }

    if (
      middleNumber <
      nums2[middleIndexDeviation - Number(middleIndexDeviation > 0)]
    ) {
      return getMedianFor(nums1, nums2, middleIndex + 1, endIndex);
    }
  }
}

function getMedianOf(nums: number[]): number {
  let middleIndex = getMiddleIndexOf(nums.length);
  if (nums.length % 2 == 0) {
    return getMedianSum(nums[middleIndex], nums[middleIndex + 1]);
  } else {
    return nums[middleIndex];
  }
}

function getMedianSum(n1: number, n2: number): number {
  let sum = n1 + n2;
  return sum ? sum / 2 : 0;
}

function getMiddleIndexOf(num: number): number {
  let isSumEven = num % 2 == 0;
  return Math.floor(num / 2) - Number(isSumEven);
}

function getMedianMinOf(num1: number, num2: number): number {
  return !num1 ? num2 : !num2 ? num1 : Math.min(num1, num2);
}

describe("findMedianSortedArrays function", () => {
  it("returns correct answer for [1], [2]", () => {
    expect(findMedianSortedArrays([1], [2])).toEqual(1.5);
  });

  it("returns correct answer for [1, 3], [2]", () => {
    expect(findMedianSortedArrays([1, 3], [2])).toEqual(2);
  });

  it("returns correct answer for [1], [2, 3]", () => {
    expect(findMedianSortedArrays([1], [2, 3])).toEqual(2);
  });

  it("returns correct answer for [1, 2], [3, 4]", () => {
    expect(findMedianSortedArrays([1, 2], [3, 4])).toEqual(2.5);
  });

  it("returns correct answer for [1], [2, 3, 4]", () => {
    expect(findMedianSortedArrays([1], [2, 3, 4])).toEqual(2.5);
  });

  it("returns correct answer for [1, 3], [2, 7]", () => {
    expect(findMedianSortedArrays([1, 3], [2, 7])).toEqual(2.5);
  });

  it("returns correct answer for [0, 0], [0, 0]", () => {
    expect(findMedianSortedArrays([0, 0], [0, 0])).toEqual(0);
  });

  it("returns correct answer for [1], []", () => {
    expect(findMedianSortedArrays([1], [])).toEqual(1);
  });

  it("returns correct answer for [], [2]", () => {
    expect(findMedianSortedArrays([], [2])).toEqual(2);
  });

  it("returns correct answer for [], [2, 3]", () => {
    expect(findMedianSortedArrays([], [2, 3])).toEqual(2.5);
  });
});
