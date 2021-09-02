/// <reference types='cypress' />
import reverseString from '../../../leetcode/reverseString'

describe('/leetcode/reverseString Test', () => {
  it('reverseString', () => {
    const x = ['h', 'e', 'l', 'l', 'o'];

    expect(reverseString(x)).to.deep.equal(['o', 'l', 'l', 'e', 'h'])
    expect(reverseString(['H','a','n','n','a','h'])).to.deep.equal(['h','a','n','n','a','H'])
  })
})
