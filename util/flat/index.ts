// 递归版本
// function flat(arr, level = 1) {
//   if (level <= 0) {
//     // 即使不扁平化也要返回新数组
//     return arr.concat()
//   }
//   let result = []

//   for (let i = 0; i < arr.length; i++) {
//     const item = arr[i]

//     if (Array.isArray(item)) {
//       result = result.concat(flat(item, level - 1))
//     } else {
//       result.push(item)
//     }
//   }
//   return result
// }

// reduce 版本
// function flat(arr, level = 1) {
//   if (level <= 0) {
//     // 即使不扁平化也要返回新数组
//     return arr.concat()
//   }
//   return arr.reduce((prev, item) => prev.concat(Array.isArray(item) ? flat(item, level - 1) : item), [])
// }

// 迭代版本
function flat(arr, level = 1) {
  let stack = arr.concat([])
  let isDone = false

  while (level > 0 && !isDone) {
    const len = stack.length

    isDone = true
    for (let i = 0; i < len; i++) {
      const curr = stack.shift()

      if (Array.isArray(curr) && level > 0) {
        stack = stack.concat(curr)
        isDone = false
      } else {
        stack.push(curr)
      }
    }
    level--
  }
  return stack
}

export default flat
