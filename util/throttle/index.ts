type Handler = (...args: unknown[]) => void

export default function throttle (func: Handler, timeout: number, { leading = true, trailing = true }): Handler {
  let timer = null
  let lastTime = 0
  let params = null
  let context = null

  const helper = () => {
    // 记录最新执行时间，避免剩余时间计算不正确
    // 重置为0用于判断是否要第一次执行
    lastTime = leading ? Date.now() : 0
    timer = null
    func.apply(context, params)
  }

  return function (...args: unknown[]) {
    const now = Date.now()
    lastTime = lastTime === 0 && leading ? lastTime : now
    const remaining = timeout - (now - lastTime)
    let result = null

    // 如果没有剩余时间或者剩余时间大于定时时间（即修改了系统时间）
    if (remaining <= 0 || remaining > timeout) {
      // 取消定时器，避免定时器的函数执行
      if (timer) {
        clearTimeout(timer)
        timer = null
      }
      lastTime = now
      func.apply(context, params)
    } else if (!timer && trailing) {
      timer = setTimeout(helper, timeout)
    }

    return result
  }
}
