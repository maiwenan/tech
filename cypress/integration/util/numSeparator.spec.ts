/// <reference types="cypress" />
import numSeparator from '../../../util/numSeparator'

describe('/util/numSeparator Test', () => {
  it('numSeparator', () => {
    const num = 19351235.235767

    expect(numSeparator(num)).to.deep.equal('19,351,235.235767')
  })

  it('numSeparator integer', () => {
    const num = 119351235

    expect(numSeparator(num)).to.deep.equal('119,351,235')
  })

  it('numSeparator nagative number', () => {
    const num = -119351235.235767

    expect(numSeparator(num)).to.deep.equal('-119,351,235.235767')
  })
})
