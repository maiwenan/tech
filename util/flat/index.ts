// 普通版本
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
function flat(arr, level = 1) {
  if (level <= 0) {
    // 即使不扁平化也要返回新数组
    return arr.concat()
  }
  return arr.reduce((prev, item) => prev.concat(Array.isArray(item) ? flat(item, level - 1) : item), [])
}

export default flat
