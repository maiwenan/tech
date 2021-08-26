## 函数柯里化

定义：柯里化是一种将使用多个参数的函数转换成一系列使用一个参数的函数的技术。

作用：

- 参数复用，本质上是降低通用性，提高适用性。
- 延迟计算
- 函数式编程，配合组合函数使用

### 注意点

1. 判断入参个数是否大于目标函数的参数个数 `args.length >= func.length`
2. 返回下一个curry函数的时候需积累之前的函数参数