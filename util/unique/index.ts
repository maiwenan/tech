// 遍历 + indexOf
// function unique(arr) {
//   let result = []

//   arr.forEach(item => {
//     if (result.indexOf(item) === -1) {
//       result.push(item)
//     }
//   })
//   return result
// }

// WeakMap + 遍历
// function unique(arr) {
//   const map = new Map()
//   let result = []

//   arr.forEach(item => {
//     if (!map.has(item)) {
//       result.push(item)
//       map.set(item, true)
//     }
//   })
//   return result
// }

// 简化版：遍历 + indexOf
function unique(arr) {
  return arr.filter((item, index, arr) => arr.indexOf(item) === index)
}

// Set 版本
// function unique(arr) {
//   return [...new Set(arr)]
// }
// function unique(arr) {
//   return Array.from(new Set(arr))
// }

export default unique
