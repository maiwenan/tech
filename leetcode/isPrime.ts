/**
 * 判断一个数是否是素数（质数）
 * 定义：约数只有1和本身的整数成为质数，或成为素数（1被定义为不是质数）
 */

// 1. 直观判断法
// function isPrime(n: number) {
//   if (n === 1) return false
//   for (let i = 2; i <= n - 1; i++) {
//     if (n % i === 0) {
//       return false
//     }
//   }
//   return true
// }

// 2. 直观判断法改进版
// 改进依据：一个数如果可以进行因式分解，那么分解时得到的两个数一定是一个小于等于`sqrt(n)`，
// 另一个则大于等于`sqrt(n)`，因此我们只需遍历判断到`sqrt(n)`即可
// function isPrime(n: number) {
//   if (n === 1) return false

//   const len = Math.sqrt(n)

//   for (let i = 2; i <= len; i++) {
//     if (n % i === 0) {
//       return false
//     }
//   }
//   return true
// }

// 3. 倍数法
// 质数分布规律：大于等于`5`的质数一定和`6`的倍数相邻
// 当x>=1时，大于等于5可表示为：... 6x-1, 6x, 6x+1, 6x+2, 6x+3, 6x+4, 6x+5, 6(x+1), 6(x+1)+1 ...
// 可以看到其中 6x, 6x+2, 6x+3, 6x+4 都是能被`2`或`3`整除的，因此这几个数不会是质数，
// 所以我们只需考虑：6x-1 和 6x+1 这两种情况即可
function isPrime(n: number) {
  if (n === 2 || n === 3) {
    return true
  }
  if (n === 1 || (n + 1) % 6 !== 0 && (n - 1) % 6 !== 0) {
    return false
  }

  const len = Math.sqrt(n)

  for (let i = 2; i <= len; i++) {
    if (n % i === 0) {
      return false
    }
  }
  return true
}

export default isPrime
