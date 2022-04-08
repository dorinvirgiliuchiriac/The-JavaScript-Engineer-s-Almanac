// https://leetcode.com/problems/add-two-numbers/
/**
 * O(n^2)
 * 93% faster
 */

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function addTwoNumbers(
  l1: ListNode | null,
  l2: ListNode | null,
  hasCarry = false
): ListNode | null {
  if (!l1 || !l2) {
    if (hasCarry) {
      return incrementBy1(l1 || l2);
    }
    return l1 || l2;
  }

  let val = l1.val + l2.val + Number(hasCarry);
  let nextNode = addTwoNumbers(l1.next, l2.next, val > 9);

  return new ListNode(val % 10, nextNode);
}

function incrementBy1(node: ListNode | null): ListNode {
  if (!node) {
    return new ListNode(1);
  }

  node.val += 1;
  if (node.val > 9) {
    node.val %= 10;
    node.next = incrementBy1(node.next);
  }

  return node;
}

describe("twoSum function", () => {
  it("calculates 5 + 8 = 13", () => {
    let l1 = { val: 5, next: null };
    let l2 = { val: 8, next: null };
    let lResult = {
      val: 3,
      next: { val: 1, next: null },
    };
    expect(addTwoNumbers(l1, l2)).toEqual(lResult);
  });

  it("calculates 11 + 999 = 1010", () => {
    let l1 = { val: 1, next: { val: 1, next: null } };
    let l2 = { val: 9, next: { val: 9, next: { val: 9, next: null } } };
    let lResult = {
      val: 0,
      next: { val: 1, next: { val: 0, next: { val: 1, next: null } } },
    };
    expect(addTwoNumbers(l1, l2)).toEqual(lResult);
  });

  it("calculates 999 + 12 = 1011", () => {
    let l1 = { val: 1, next: { val: 1, next: null } };
    let l2 = { val: 9, next: { val: 9, next: { val: 9, next: null } } };
    let lResult = {
      val: 0,
      next: { val: 1, next: { val: 0, next: { val: 1, next: null } } },
    };
    expect(addTwoNumbers(l2, l1)).toEqual(lResult);
  });
});
