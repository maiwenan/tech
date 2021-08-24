## 节流

定义：在连续触发事件时，在没n秒内只执行一次。节流会稀释函数的执行频率。

### 时间戳版本

特点：在事件触发过程中，函数会立即执行一次

```
export default function throttle (func: Handler, timeout: number): Handler {
  let lastTime = 0

  return function (...args: unknown[]) {
    const now = Date.now()
    let result = null

    // 第一次由于 lastTime 为0，并且通常 timeout 不会设置得比 Date.now() 大，
    // 因此第一次触发事件，事件函数会立刻执行一次
    if (now - lastTime > timeout) {
      result = func.apply(this, args)
      lastTime = now
    }

    return result
  }
}
```

### 定时器版本

特点：在事件触发结束后，会执行最后一次事件函数

```
export default function throttle (func: Handler, timeout: number): Handler {
  let timer = null

  return function (...args: unknown[]) {
    if (!timer) {
      // 由于一开始就设置setTimeout延迟执行事件函数，并且在事件触发结束时没有取消定时器，
      // 因此在事件触发结束后会最后一次执行事件
      timer = setTimeout(() => {
        func.apply(this, args)
        timer = null
      }, timeout)
    }
  }
}
```

### 合并版本

1. 没有剩余时间或者剩余时间大于定时时间时，执行时间函数；期间如果有定时器则取消定时器
2. 如果还有剩余时间并且没有定时器，则设置定时执行时间函数
3. 事件触发结束后，定时器最后一次执行事件函数时需更新最后执行时间
4. 重点是避免相近时间内执行两次（即时间一次执行，定时器一次执行）
