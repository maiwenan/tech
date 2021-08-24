type Handler = (...args: unknown[]) => void

function debounce (func: Handler, timeout: number, immediate = false): Handler {
  let timer = null
  let result = null

  function inner (...args: unknown[]) {
    if (immediate) {
      // 立即执行
      if (!timer) {
        result = func.apply(this, args)
      } else {
        clearTimeout(timer)
      }
      timer = setTimeout(function () {
        // 标记下一次事件触发可立即执行
        timer = null
      }, timeout)
    } else {
      // 非立即执行
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(
        // 绑定 this , 并处理事件传参（需注意支持多个参数）
        func.bind(this, ...args),
        timeout
      )
    }
    return result
  }

  // 取消执行
  inner.cancel = function () {
    clearTimeout(timer)
    timer = null
  }

  return inner
}

export default debounce
