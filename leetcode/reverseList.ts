/**
 * 反转链表
 * 定义一个函数，输入一个链表的头节点，反转该链表并输出反转后链表的头节点。
 * https://leetcode-cn.com/problems/fan-zhuan-lian-biao-lcof/
 */

export class Node<T> {
  value: T;
  next: Node<T>;
  constructor(value) {
    this.value = value
    this.next = null
  }
}

/**
 * 变量交换法
 */
// const reverseList = (head: Node<any>):Node<any> => {
//   let lastNode = null
//   let current = head

//   while (current) {
//     const next = current.next

//     current.next = lastNode
//     lastNode = current
//     current = next
//   }
//   return lastNode
// }

/**
 * 递归
 * 链表反转工作：node.next.next = node
 * 空间复杂度主要取决于递归调用的栈空间，最多为 nn 层
 */
const reverseList = (head: Node<any>):Node<any> => {
  if (!head || !head.next) {
    return head
  }

  const newHead = reverseList(head.next)

  head.next.next = head
  head.next = null

  return newHead
}

export default reverseList
