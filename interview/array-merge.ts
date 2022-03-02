/**
 * 两个数组合并成一个数组
 * 请把两个数组 ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'D1', 'D2'] 和 ['A', 'B', 'C', 'D']，
 * 合并为 ['A1', 'A2', 'A', 'B1', 'B2', 'B', 'C1', 'C2', 'C', 'D1', 'D2', 'D']。
 */

/**
 * 方案1：
 * 1. 利用concat合并和sort方法排序
 * 2. 排序逻辑：字符长度长的排在前面；相同长度的字符则比较ASC码总和大小，大的排在后面
 */
function mergeArray(arr1, arr2) {
  let arr = [...arr1]

  let j = 0
  for (let i = 0; i < arr2.length; i++) {
    const code = arr2[i].charCodeAt(0)
    while (j < arr.length) {
      j++
      const nextStr = arr[j]
      if (nextStr && nextStr.charCodeAt(0) !== code) {
        arr.splice(j, 0, arr2[i])
        break
      } else if (!nextStr) {
        arr.push(arr2[i])
        break
      }
    }
  }
  return arr
}
