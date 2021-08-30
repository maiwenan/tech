/**
 * 9. 回文数 https://leetcode-cn.com/problems/palindrome-number/
 */

// 字符串反转方法
// function isPalindrome(x: number) {
//   const str = x.toString()
//   const len = Math.floor(str.length / 2)

//   for (let i = 0; i < len; i++) {
//     if (str[i] !== str[str.length - i - 1]) {
//       return false
//     }
//   }
//   return true
// }

/**
 * 数字版本原理：
 * 将数字本身反转，然后将反转后的数字与原始数字进行比较，如果它们是相同的，那么这个数字就是回文。
 * 为了避免数字反转可能导致的溢出问题，考虑只反转数字的一半，
 * 毕竟，如果该数字是回文，其后半部分反转后应该与原始数字的前半部分相同。
 * 核心点：
 * 1. 循环结束的判断条件：原数x小于等于目标数
 * 2. 通过取余数获取单个位置的数字
 * 3. 考虑奇数个数的数字场景以及数字相除需取整的场景
 */
function isPalindrome(x: number) {
  if (x < 0) return false
  let y = 0

  while (x > y) {
    y = y * 10 + x % 10
    x = Math.floor(x / 10)
  }

  return x === y || Math.floor(y / 10) === x
}

export default isPalindrome
