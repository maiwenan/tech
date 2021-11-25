/**
 * @param head 链表头节点
 * @param tail 链表尾节点
 */
function reverse(head: ListNode, tail: ListNode) {
  let prev = null
  let curr = head
  let next = null

  while (curr) {
    next = curr.next
    curr.next = prev
    prev = curr
    curr = next
  }
  const tmp = tail
  tail = head
  head = tmp
  return head
}

a->b->c->d

a<-b<-c<-d

prev,cur,next

cur.next = prev
prev = cur
cur = next
next = cur.next
