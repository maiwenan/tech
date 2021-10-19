## Cumulative Layout Shift 累积布局偏移

> https://web.dev/cls/

[Cumulative Layout Shift (CLS) ](https://web.dev/cls/)：累积布局偏移，测量视觉稳定性。为了提供良好的用户体验，页面的 CLS 应保持在 0.1. 或更少。

CLS 测量整个页面生命周期内发生的所有意外布局偏移中最大一连串的布局偏移分数。

布局偏移由[布局不稳定性 API](https://github.com/WICG/layout-instability)定义，只要可视区域中可见元素的起始位置（例如，元素在默认书写模式下的顶部和左侧位置）在两帧之间发生了变更，该 API 就会报告layout-shift条目。这样的元素被视为不稳定元素。

### 布局偏移分数

```
布局偏移分数 = 影响分数 * 距离分数
```

### 影响分数

影响分数测量不稳定元素对两帧之间的可视区域产生的影响。

前一帧和当前帧的所有不稳定元素的可见区域集合（占总可视区域的部分）就是当前帧的影响分数。

### 距离分数

距离分数指的是任何不稳定元素在一帧中位移的最大距离（水平或垂直）除以可视区域的最大尺寸维度（宽度或高度，以较大者为准）

### 如何测量 CLS

CLS 可以进行实验室测量或实际测量

在js中可以使用[布局不稳定API](https://github.com/WICG/layout-instability)测量CLS：

创建一个PerformanceObserver来侦听意外layout-shift条目、将条目按会话分组、记录最大会话值，并在最大会话值发生改变时更新记录。

```
let clsValue = 0
let clsEntries = []
let sessionValue = 0
let sessionEntries = []

const o = new PerformanceObserver(entryList => {
  for (const entry of entryList.getEntries()) {
    // 带有最近用户输入标志的布局偏移不计算在内
    if (!entry.hadRecentInput) {
      const firstSessionEntry = sessionEntries[0]
      const lastSessionEntry = sessionEntries[sessionEntries.length - 1]

      // 如果当前entry与上一个entry相隔时间小于1s，并且与会话中第一个entry相隔不超过5s，
      // 那么当前entry包含在当前会话中，否则开始一个新的会话
      if (
        sessionValue &&
        entry.startTime - lastSessionEntry.startTime < 1000 &&
        entry.startTime - firstSessionEntry.startTime < 5000
      ) {
        sessionValue += entry.value
        sessionEntries.push(entry)
      } else {
        sessionValue = 0
        sessionEntries = []
      }
    }

    // 如果当前会话值大于当前 CLS 值，
    // 那么更新 CLS 及其相关条目。
    if (sessionValue > clsValue) {
      clsValue = sessionValue;
      clsEntries = sessionEntries;

      // 将更新值（及其条目）记录在控制台中。
      console.log('CLS:', clsValue, clsEntries)
    }
  }
})

o.observe({
  type: 'layout-shift',
  buffered: true
})
```

### 如何改进 CLS

1. 始终在图像和视频元素上包含尺寸属性，或者通过使用CSS 长宽比容器之类的方式预留所需的空间
2. 除非是对用户交互做出响应，否则切勿在现有内容的上方插入内容
3. 首选转换动画，而不是触发布局偏移的属性动画
