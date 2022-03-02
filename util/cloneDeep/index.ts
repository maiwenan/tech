const stringType = '[object String]'
const boolType = '[object Boolean]'
const numberType = '[object Number]'
const dateType = '[object Date]'
const errorType = '[object Error]'
const regexpType = '[object RegExp]'
const symbolType = '[object Symbol]'

// 可遍历类型
const mapType = '[object Map]'
const setType = '[object Set]'
const arrayType = '[object Array]'
const objectType = '[object Object]'
const functionType = '[object Function]'

function isFunction(target) {
  return typeof target === 'function'
}
function isObject(target) {
  const type = typeof target

  return target !== null && (type === 'object' || type === 'function')
}
function getType(target) {
  return Object.prototype.toString.call(target)
}
function getCtor(target) {
  return new target.constructor()
}
function cloneFunction(target) {
  let fn
  eval(`fn = ${target.toString()}`)
  return fn;
}
function cloneReg(target) {
  const reFlags = /\w*$/;
  const result = new target.constructor(target.source, reFlags.exec(target));
  result.lastIndex = target.lastIndex;
  return result;
}
function cloneSymbol(target) {
  return Object(Symbol.prototype.valueOf.call(target));
}

function cloneDeep(target, record = new WeakMap()) {
  // 复制基本类型、null等
  if (!isObject(target)) {
    return target
  }
  // 处理循环引用
  if (record.has(target)) {
    return record.get(target)
  }

  const type = getType(target)
  let result = null

  switch(type) {
    case setType:
      result = getCtor(target)
      record.set(target, result)
      target.forEach(value => result.add(cloneDeep(value, record)))
      return result
    case mapType:
      result = getCtor(target)
      record.set(target, result)
      target.forEach((value, key) => result.set(key, cloneDeep(value, record)))
      return result
    case objectType:
    case arrayType:
    case functionType:
      result = getCtor(target)
      record.set(target, result)
      console.log(isFunction(target), target);
      if (isFunction(target)) {
        result = cloneFunction(target)
      }
      for (let key in target) {
        result[key] = cloneDeep(target[key], record)
      }
      return result
    case boolType:
    case numberType:
    case stringType:
    case errorType:
    case dateType:
      return new target.constructor(target)
    case regexpType:
      return cloneReg(target)
    case symbolType:
      return cloneSymbol(target)
    default:
      return null
  }
}

export default cloneDeep
