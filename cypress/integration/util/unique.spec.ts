/// <reference types="cypress" />
import unique from '../../../util/unique'

describe('/util/unique Test', () => {
  it('unique', () => {
    const arr = [1, 2, '1', 2, 1];

    expect(unique(arr)).to.deep.equal([1, 2, '1'])
  })
})



