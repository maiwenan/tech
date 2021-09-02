/// <reference types="cypress" />
import fib from '../../../leetcode/fib'

describe('/leetcode/fib Test', () => {
  it('isPrime 1', () => {
    expect(fib(2)).to.equal(1)
    expect(fib(3)).to.equal(2)
    expect(fib(4)).to.equal(3)
  })
})
