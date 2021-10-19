## First Input Delay 首次输入延迟

> https://web.dev/fid/

[First Input Delay (FID) ](https://web.dev/fid/)：首次输入延迟，测量交互性。为了提供良好的用户体验，页面的 FID 应为100 毫秒或更短。

FID 测量从用户第一次与页面交互（例如当他们单击链接、点按按钮或使用由 JavaScript 驱动的自定义控件）直到浏览器对交互作出响应，并实际能够开始处理事件处理程序所经过的时间。

FID 测量接收到输入事件的时间点与主线程下一次空闲的时间点之间的差值

可衍生出 User Input Delay 衡量页面的交互性能？

### 为什么只考虑首次输入

1. 首次输入延迟将会是用户对您网站响应度的第一印象
2. 我们现如今在网络上看到的最大的交互性问题发生在页面加载期间

### 为什么只考虑输入延迟？

FID 只测量事件处理过程中的"延迟"。FID 既不测量事件处理本身所花费的时间，也不测量浏览器在运行事件处理程序后更新用户界面所花费的时间。

### 如何测量 FID

FID 是一个只能进行实际测量的指标，因为该项指标需要真实用户与您的页面进行交互。

> FID 需要真实用户，因此无法在实验室中进行测量。但是，Total Blocking Time 总阻塞时间 (TBT)指标不仅可以进行实验室测量，还与实际的 FID 关联性强，而且可以捕获影响交互性的问题。能够在实验室中改进 TBT 的优化也应该能为您的用户改进 FID。

虽然所有核心 Web 指标阈值的优选百分位数是第 75 个百分位数，但具体到 FID，我们仍然强烈建议您将阈值设置在第 95-99 个百分位数

在js中测量FID，可以使用[事件计时API](https://wicg.github.io/event-timing)：

```
const o = new PerformanceObserver(entryList => {
  for (const entry of entryList.getEntries()) {
    const delay = entry.processingStart - entry.startTime;
    console.log('FID candidate:', delay, entry);
  }
})

o.observe({
  type: 'first-input',
  buffered: true
})
```
