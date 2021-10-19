/**
 * 环形链表
 * 如果链表中有某个节点，可以通过连续跟踪 next 指针再次到达，则链表中存在环。
 */

/**
 * 哈希表缓存法
 */
// const hasCycle = head => {
//   const map = new WeakMap()

//   while (head) {
//     if (map.get(head)) {
//       return true
//     }
//     map.set(head, true)
//     head = head.next
//   }
//   return false
// }

/**
 * 快慢指针法
 */
 const hasCycle = head => {
  if (!head || !head.next) {
    return false
  }

  let slow = head
  let fast = head.next

  while (fast !== slow) {
    if (!fast || !slow) {
      return false
    }
    slow = head.next
    // 快指针直接指向后面第二个节点
    fast = head.next.next
  }

  return true
}


export default hasCycle
