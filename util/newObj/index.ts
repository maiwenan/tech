/**
 * 1. 支持 new 操作符创建对象时的传参
 * 2. 支持创建的对象能访问fn的原型属性或方法
 * 3. 如果fn显式返回一个对象或数组，则直接把其作为返回值，否则返回自己创建的对象
 */
function newObj(fn, ...args) {
  let obj = {}

  obj.__proto__ = fn.prototype
  const res = fn.apply(obj, args)
  return typeof res === 'object' ? res : obj
}
