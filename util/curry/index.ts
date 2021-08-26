// es6
// export default function curry(func, ...args) {
//   return func.length <= args.length
//     ? func(...args)
//     : curry.bind(null, func, ...args)
// }

// es5
export default function curry(func) {
  const slice = Array.prototype.slice
  const args = slice.call(arguments, 1)

  if (func.length <= args.length) {
    return func.apply(this, args)
  } else {
    return function () {
      const innerArgs = args.concat(slice.call(arguments))

      innerArgs.unshift(func)
      return curry.apply(this, innerArgs)
    }
  }
}
