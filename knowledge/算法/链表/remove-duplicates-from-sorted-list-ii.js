/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * https://leetcode-cn.com/problems/remove-duplicates-from-sorted-list-ii/
 * 一次遍历：使用变量记录法额外处理头节点边界值
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteDuplicates = function (head) {
  let prev = null;
  let cur = head;

  while (cur) {
    let next = cur.next;
    let hasRepeat = false;

    // 循环把当前节点后续重复的节点删除（即当前节点除外）
    while (next && next.val === cur.val) {
      cur.next = next.next;
      next = cur.next;
      hasRepeat = true;
    }
    // 记录当前节点是重复节点（处理重复节点）
    if (hasRepeat) {
      // 如果当前重复节点不是头节点
      if (prev) {
        prev.next = cur.next;
      } else {
        // 当前重复节点是头节点的情况
        head = cur.next;
      }
    } else {
      // 如果当前节点没有重复节点，则记录当前节点为上一个节点，走正常的循环遍历
      prev = cur;
    }
    // 遍历下一个节点
    cur = cur.next;
  }

  return head;
};

/**
 * 使用虚拟头方式
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteDuplicates = function (head) {
  let vNode = new ListNode(0, head);
  let cur = vNode;

  // 从虚拟头下一个节点开始遍历
  while (cur.next && cur.next.next) {
    // 如果当前节点和下一个节点重复（该if判断其实相当于是记录是否有重复节点的变量）
    if (cur.next.val === cur.next.next.val) {
      const val = cur.next.val;

      // 删除连续重复的节点（需注意，当前节点其实在第一次就会被删除，这和遍历标记法有点不同，
      // 遍历标记法在最后才删除重复的当前节点）
      while (cur.next && val === cur.next.val) {
        cur.next = cur.next.next;
      }
    } else {
      // 如果不存在重复节点，正常遍历即可
      cur = cur.next;
    }
  }
  // 返回虚拟头的next指针，即链表的表头
  return vNode.next;
};
