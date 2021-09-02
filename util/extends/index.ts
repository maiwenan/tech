/**
 * 1. 原型链继承（利用构造函数的prototype实现集成，集成父构造函数的实例对象的属性）
 */
export function extendByProto(Parent, Child, ...args) {
  Child.prototype = new Parent(...args)
  return Child
}

/**
 * 2. 原型式继承（直接集成对象属性）
 */
export function createObj(obj) {
  function F() {}
  F.prototype = obj
  return new F()
}
