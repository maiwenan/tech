/// <reference types="cypress" />
import flat from '../../../util/flat'

describe('/util/flat Test', () => {
  it('flat with level', () => {
    const arr = [1, 2, [1, [1, 2, [1, 2, 3]]], 5, "string", { name: "1" }]

    expect(flat(arr)).to.deep.equal([1, 2, 1, [1, 2, [1, 2, 3]], 5, "string", { name: "1" }])
    expect(flat(arr, 2)).to.deep.equal([1, 2, 1, 1, 2, [1, 2, 3], 5, "string", { name: "1" }])
    expect(flat(arr, 3)).to.deep.equal([1, 2, 1, 1, 2, 1, 2, 3, 5, "string", { name: "1" }])
  })

  it('flat with Infinity level', () => {
    const arr = [1, 2, [1, [1, 2, [1, 2, 3]]], 5, "string", { name: "1" }]

    expect(flat(arr, Infinity)).to.deep.equal([1, 2, 1, 1, 2, 1, 2, 3, 5, "string", { name: "1" }])
  })

  it('flat plain index', () => {
    const arr = [1, 2, , undefined, [1, [1, 2, , [1, 2, , 3]]], 5, "string", { name: "1" }]

    expect(flat(arr)).to.deep.equal([1, 2, undefined, 1, [1, 2, , [1, 2, , 3]], 5, "string", { name: "1" }])
  })

  it('flat with -1', () => {
    const arr = [1, 2, [1, [1, 2, [1, 2, 3]]], 5, "string", { name: "1" }]

    expect(flat(arr, -1)).to.not.equal(arr)
    expect(flat(arr, -1)).to.deep.equal(arr)
  })
})
