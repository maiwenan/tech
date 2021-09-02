/// <reference types="cypress" />
import isPrime from '../../../leetcode/isPrime'

describe('/leetcode/isPrime Test', () => {
  it('isPrime 1', () => {
    expect(isPrime(9)).to.equal(false)
    expect(isPrime(1)).to.equal(false)
    expect(isPrime(11)).to.equal(true)
  })
})
