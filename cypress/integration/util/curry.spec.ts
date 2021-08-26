/// <reference types="cypress" />
import curry from '../../../util/curry'

describe('/util/curry Test', () => {
  it('curry default', () => {
    const fn = curry(function (a, b, c) {
      return [a, b, c];
    });
    const result = ['a', 'b', 'c']

    expect(fn('a', 'b', 'c')).to.deep.equal(result)
    expect(fn('a', 'b')('c')).to.deep.equal(result)
    expect(fn('a')('b')('c')).to.deep.equal(result)
    expect(fn('a')('b', 'c')).to.deep.equal(result)
  })
})
