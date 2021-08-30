/**
 * 反转字符串
 * 1. 双指针方法
 */
function reverseString(str: string[]) {
  const len = str.length - 1

  for (let i = 0; i < len / 2; i++) {
    const tmp = str[i]
    str[i] = str[len - i]
    str[len - i] = tmp
  }

  return str
}

export default reverseString
