function bigAdd(a: string, b: string) {
  console.time('test')
  const max = Math.max(a.length, b.length)
  let addOne = 0
  let result = []

  a = a.padStart(max, '0')
  b = b.padStart(max, '0')

  for (let i = max - 1; i >= 0; i--) {
    let tmp = parseInt(a[i]) + parseInt(b[i]) + addOne

    if (tmp >= 10) {
      addOne = 1
      tmp -= 10
    } else {
      addOne = 0
    }
    result.unshift(tmp)
  }
  if (addOne) {
    result.unshift(addOne)
  }
  console.timeEnd('test')
  return result.join('')
}

export default bigAdd
