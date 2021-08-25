/// <reference types="cypress" />
import cloneDeep from '../../../util/cloneDeep'

describe('/util/cloneDeep Test', () => {
  it('clone basic type', () => {
    expect(cloneDeep('test')).to.equal('test')
    expect(cloneDeep(1)).to.equal(1)
    expect(cloneDeep(true)).to.equal(true)
  })

  it('clone with object and array', () => {
    const target = {
      name: 'alex',
      age: 19,
      friends: [{
        name: 'ming',
        age: 18
      }, {
        name: 'li',
        age: 19
      }],
      school: {
        name: 'xxx',
        addr: 'some where'
      }
    }
    const newObj = cloneDeep(target)

    expect(JSON.stringify(newObj)).to.equal(JSON.stringify(target))
    expect(newObj === target).to.not.equal(true)
    newObj.age = 20
    expect(newObj.age).to.not.equal(target.age)
    newObj.school.name = 'sss'
    expect(newObj.school.name).to.not.equal(target.school.name)
    expect(newObj.friends).to.not.equal(target.friends)
    newObj.friends[0].age = 20
    expect(newObj.friends[0].age).to.not.equal(target.friends[0].age)
  })

  it('clone with circle', () => {
    const target = {
      name: 'alex',
      a: null,
      link: null
    }
    target.link = {
      linkname: 'xxx',
      parent: target
    }

    const newObj = cloneDeep(target)
    expect(newObj.link.linkname).to.equal(target.link.linkname)
    expect(newObj.link.parent.name).to.equal(target.name)
    newObj.name = 'ming'
    expect(newObj.link.parent.name).to.not.equal(target.name)
    expect(newObj.link.parent.name).to.equal(newObj.name)
  })

  it('clone', () => {
    const map = new Map();
    const set = new Set();
    map.set('key', 'value');
    map.set('abc', 'efg');
    set.add('abc');
    set.add('efg');
    const target = {
      field1: 1,
      field2: undefined,
      field3: {
        child: 'child'
      },
      field4: [2, 4, 8],
      empty: null,
      map,
      set,
      bool: new Boolean(true),
      num: new Number(2),
      str: new String(2),
      symbol: Object(Symbol(1)),
      date: new Date(),
      reg: /\d+/,
      error: new Error(),
      func1: () => {
        console.log('test');
      },
      func2: function (a, b) {
        return a + b;
      }
    };
    target.func2.xxx = 'test'

    const newObj = cloneDeep(target)
    expect(newObj === target).to.not.equal(true)
    expect(newObj.func2(1, 2)).to.equal(3)
    expect(newObj.func2.xxx).to.equal(target.func2.xxx)
    newObj.func2.xxx = 'test2'
    expect(newObj.func2.xxx).to.not.equal(target.func2.xxx)
  })
})
