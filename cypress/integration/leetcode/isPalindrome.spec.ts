/// <reference types="cypress" />
import isPalindrome from '../../../leetcode/isPalindrome'

describe('/util/isPalindrome Test', () => {
  it('isPalindrome', () => {
    const x = 12121;

    expect(isPalindrome(x)).to.equal(true)
  })
})