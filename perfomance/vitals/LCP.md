## Largest Contentful Paint 最大内容绘制

> https://web.dev/lcp/

[Largest Contentful Paint (LCP) ](https://web.dev/lcp/)：最大内容绘制，测量加载性能。为了提供良好的用户体验，LCP 应在页面首次开始加载后的2.5 秒内发生

最大内容绘制 (LCP) 指标会根据页面首次开始加载的时间点来报告可视区域内可见的最大图像或文本块完成渲染的相对时间。

### 哪些元素在考量范围内？ 

1. `<img>`元素
2. 内嵌在`<svg>`内的`<image>`元素
3. `<video>`元素
4. 通过`url()`加载的背景图片
5. 包含文本节点或其他行内级文本元素子元素的块级元素（即包含内容的块级元素）

### 如何测量

LCP 可以进行实验室测量和实际测量

实测工具：

- Chrome 用户体验报告
- PageSpeed Insights 网页速度测量工具
- 搜索控制台（核心 Web 指标报告）
- web-vitals JavaScript 库

实验室工具：

- Chrome 开发者工具
- 灯塔
- WebPageTest 网页性能测试工具

在js中可以使用以下代码获取LCP，

```
const o = new PerformanceObserver(entryList => {
  for (const entry of entryList.getEntries()) {
    console.log('LCP candidate:', entry.startTime, entry);
  }
})

o.observe({
  type: 'largest-contentful-paint',
  buffered: true
})
```

实际使用时，推荐使用`web-titals.js`库进行测量。

### 如何改进

影响因素有：

1. 服务器响应速度
2. js和css的渲染阻塞
3. 资源加载时间
4. 客户端渲染速度
