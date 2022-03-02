/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * https://leetcode-cn.com/problems/merge-two-sorted-lists/
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function (list1, list2) {
  if (!list1) {
    return list2;
  }
  if (!list2) {
    return list1;
  }
  let newList = null;
  let cur = null;

  while (list1 && list2) {
    let tmp = null;

    if (list1.val < list2.val) {
      tmp = list1;
      list1 = list1.next;
    } else {
      tmp = list2;
      list2 = list2.next;
    }
    if (newList === null) {
      newList = cur = tmp;
    } else {
      cur.next = tmp;
      cur = cur.next;
    }
  }
  if (!list1) {
    cur.next = list2;
  }
  if (!list2) {
    cur.next = list1;
  }

  return newList;
};

var mergeTwoLists = function (list1, list2) {
  if (!list1) {
    return list2;
  }
  if (!list2) {
    return list1;
  }
  let minNode = null;

  if (list1.val < list2.val) {
    minNode = list1;
    minNode.next = mergeTwoLists(list1.next, list2);
  } else {
    minNode = list2;
    minNode.next = mergeTwoLists(list1, list2.next);
  }

  return minNode;
};
