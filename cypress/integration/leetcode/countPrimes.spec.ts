/// <reference types="cypress" />
import countPrimes from '../../../leetcode/countPrimes'

describe('/leetcode/countPrimes Test', () => {
  it('countPrimes', () => {
    expect(countPrimes(10)).to.equal(4)
    expect(countPrimes(0)).to.equal(0)
    expect(countPrimes(1)).to.equal(0)
  })
})
