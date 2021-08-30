// function numSeparator(num: number) {
//   if (!isNaN(num)) {
//     new Error('argument must be a number')
//   }
//   const isNegative = num < 0
//   const [header, footer] = Math.abs(num).toString().split('.')
//   const length = header.length - 1
//   let result = ''

//   for (let i = length; i >= 0; i--) {
//     result = header[i] + ((length - i) % 3 === 0 && (length - i) !== 0 ? ',' : '') + result
//   }
//   return `${isNegative ? '-' : ''}${result}${footer ? '.' + footer : ''}`
// }

// 正则方式
// `(?=exp)` 零宽断言：匹配exp前面的位置
function numSeparator(num: number) {
  return num.toString().replace(
    /\d+/,
    n => n.replace(/(\d)(?=(\d{3})+$)/g, $1 => `${$1},`)
  )
}

export default numSeparator
