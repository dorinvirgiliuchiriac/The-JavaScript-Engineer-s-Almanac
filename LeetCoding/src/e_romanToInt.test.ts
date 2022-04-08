// https://leetcode.com/problems/roman-to-integer/
/**
 * O(n)
 * 70.43% faster
 */

const ROMAN_VALUES = {
  I: 1,
  V: 5,
  X: 10,
  L: 50,
  C: 100,
  D: 500,
  M: 1000,
};

const SPECIAL_ROMAN_VALUES = {
  IV: 4,
  IX: 9,
  XL: 40,
  XC: 90,
  CD: 400,
  CM: 900,
};

function romanToInt(s: string): number {
  let sum = 0;

  Object.keys(SPECIAL_ROMAN_VALUES).forEach(countSpecialValue);

  Object.keys(ROMAN_VALUES).forEach(countValue);

  return sum;

  function countSpecialValue(value: string): void {
    if (s.includes(value)) {
      sum += SPECIAL_ROMAN_VALUES[value];
      s = s.replace(value, "");
    }
  }

  function countValue(value: string): void {
    let count = (s.match(new RegExp(value, "g")) || []).length;
    sum += ROMAN_VALUES[value] * count;
  }
}

describe("twoSum function", () => {
  it("returns correct answer for III", () => {
    expect(romanToInt("III")).toEqual(3);
  });

  it("returns correct answer for IV", () => {
    expect(romanToInt("IV")).toEqual(4);
  });

  it("returns correct answer for IX", () => {
    expect(romanToInt("IX")).toEqual(9);
  });

  it("returns correct answer for LVIII", () => {
    expect(romanToInt("LVIII")).toEqual(58);
  });

  it("returns correct answer for MCMXCIV", () => {
    expect(romanToInt("MCMXCIV")).toEqual(1994);
  });
});
