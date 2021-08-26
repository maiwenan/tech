/// <reference types="cypress" />
import bigAdd from '../../../util/bigAdd'

describe('/util/curry Test', () => {
  it('curry default', () => {
    const a = "9007199254740991";
    const b = "1234567899999999999";

    expect(bigAdd(a, b)).to.equal('1243575099254740990')
  })
})
