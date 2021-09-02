/**
 * 计数质数：https://leetcode-cn.com/problems/count-primes/
 * 统计所有小于非负整数`n`的质数的数量
 */
import isPrime from './isPrime'

// 枚举法
// function countPrimes(n: number) {
//   let count = 0

//   for (let i = 1; i < n; i++) {
//     if (isPrime(i)) {
//       count++
//     }
//   }
//   return count
// }

// 厄拉多塞筛法（埃氏筛）
function countPrimes(n: number) {
  const isPrime = new Array(n).fill(1);
  let ans = 0;
  for (let i = 2; i < n; ++i) {
    if (isPrime[i]) {
      ans += 1;
      for (let j = i * i; j < n; j += i) {
        isPrime[j] = 0;
      }
    }
  }
  return ans;
};

export default countPrimes
