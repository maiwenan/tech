/// <reference types="cypress" />
import reverseList, { Node } from '../../../leetcode/reverseList'

describe('/leetcode/isPrime Test', () => {
  it('isPrime 1', () => {
    const arr = [1, 2, 3, 4, 5]
    let head = null
    let current = null
    let result = []

    arr.map(item => {
      if (current) {
        current.next = new Node(item)
        current = current.next
      } else {
        current = new Node(item)
        head = current
      }
    })
    head = reverseList(head)
    while (head) {
      result.push(head.value)
      head = head.next
    }
    expect(result).to.deep.equal([5, 4, 3, 2, 1])
  })
})
