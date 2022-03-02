/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * https://leetcode-cn.com/problems/partition-list/
 * @param {ListNode} head
 * @param {number} x
 * @return {ListNode}
 */
 var partition = function(head, x) {
  let target = null
  let vNode= new ListNode(0, head)
  // 边界值1：第一个节点大于或等于x时，targetPrev为空，因此默认指向虚拟头，让其不为空
  let targetPrev = vNode
  let cur = vNode.next

  while (cur) {
      if (cur.val >= x) {
          target = cur
          break
      }
      targetPrev = cur
      cur = cur.next
  }
  // 边界值2：所有节点都小于x时，找不到taget
  if (!target) {
      return head
  }

  let prev = target
  cur = target.next
  while (cur) {
      if (cur.val < x) {
          // 断开当前节点
          prev.next = cur.next

          // 把当前节点拼接到前面
          targetPrev.next = cur
          cur.next = target
          // 更新targetPrev指针，使其总是指向taget的上一个节点
          targetPrev = cur

          // 遍历下一个节点
          cur = prev.next
      } else {
          // 记录上一个节点
          prev = cur
          // 遍历下一个节点
          cur = cur.next
      }
  }

  return vNode.next
};
