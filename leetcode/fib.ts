/**
 * 斐波那契数列
 * 定义：通常用 F(n) 表示，形成的序列称为 斐波那契数列 。该数列由 0 和 1 开始，后面的每一项数字都是前面两项数字的和。
 * F(0) = 0，F(1) = 1
 * F(n) = F(n - 1) + F(n - 2)，其中 n > 1
 */

// 1. 递归
function fib(n: number) {
  if (n <= 0) return 0
  if (n === 1) return 1
  return fib(n - 1) + fib(n - 2)
}

// 2. 动态规划


export default fib
