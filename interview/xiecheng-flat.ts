/**
 * 已知如下数组：
 * var arr = [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10];
 * 编写一个程序将数组扁平化去并除其中重复部分数据，最终得到一个升序且不重复的数组
 */
// reduce  + indexOf 版本
function flat(arr: any[]) {
  function innerFlat(arr: any[]): number[] {
    return arr.reduce((prev, curr) => {
      if (Array.isArray(curr)) {
        const list = innerFlat(curr)

        prev = prev.concat(list.filter(item => prev.indexOf(item) === -1))
      } else if (prev.indexOf(curr) === -1) {
        prev = prev.concat(curr)
      }
      return prev
    }, [])
  }
  if (!Array.isArray(arr)) return arr
  const result = innerFlat(arr)

  return result.sort((a, b) => a - b)
}

// Array.from + Set 版本

function flat2(arr) {
  function innerFlat(arr: any[]): number[] {
    return arr.reduce((prev, curr) => prev.concat(Array.isArray(curr) ? innerFlat(curr) : curr), [])
  }
  if (!Array.isArray(arr)) return arr
  const result = innerFlat(arr)

  return Array.from(new Set(result)).sort((a, b) => a - b)
}
