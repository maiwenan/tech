## Web 指标

> https://web.dev/vitals/

### 三个核心指标

构成核心 Web 指标的三个方面，都侧重于用户体验：

1. 加载性能
2. 交互性
3. 视觉稳定性

其中这三个方面对应的核心指标分别是：

1. [Largest Contentful Paint (LCP) ](https://web.dev/lcp/)：最大内容绘制，测量加载性能。为了提供良好的用户体验，LCP 应在页面首次开始加载后的2.5 秒内发生
2. [First Input Delay (FID) ](https://web.dev/fid/)：首次输入延迟，测量交互性。为了提供良好的用户体验，页面的 FID 应为100 毫秒或更短。
3. [Cumulative Layout Shift (CLS) ](https://web.dev/cls/)：累积布局偏移，测量视觉稳定性。为了提供良好的用户体验，页面的 CLS 应保持在 0.1. 或更少。

核心指标 | 良好 | 需要改进 | 欠佳
---|---|---|---
LCP | <=2.5 秒 | <=4 秒 | >4 秒
FID | <=100 毫秒 | <=300 毫秒 | >300 毫秒
CLS | <=0.1 | <=0.25 | >0.25


**以上核心指标的测量阈值最好在第75个百分位数，即取75分位数进行衡量**

### 测量与报告工具

实测工具:

- [PageSpeed Insights 网页速度测量工具](https://developers.google.com/speed/pagespeed/insights/)
- [搜索控制台（核心 Web 指标报告）](https://support.google.com/webmasters/answer/9205520)
- [web-vitals](https://github.com/GoogleChrome/web-vitals) JavaScript 库

实验室测量工具:

- Chrome 开发者工具
- 灯塔

### 其他指标

1. [Time to First Byte 首字节时间 (TTFB)](https://web.dev/time-to-first-byte/)
2. [First Contentful Paint 首次内容绘制 (FCP)](https://web.dev/fcp/)
3. [总阻塞时间 (TBT)](https://web.dev/tbt/)
4. [Time to Interactive 可交互时间 (TTI)](https://web.dev/tti/)
