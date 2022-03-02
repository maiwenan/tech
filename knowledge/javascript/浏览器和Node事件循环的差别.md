### 浏览器

宏任务和微任务在浏览器执行的顺序：

1. 执行一个宏任务
2. 执行完（清空）micro-task队列（微任务）

常见的宏任务有：`setTimeout` `setInterval` `IO事件` `script（整体代码）` `UI事件`

常见的微任务有：`new Promise().then()` `MutationObserver` 等

### Node

宏任务执行顺序：

`timers` --> `pending callback` --> `idle prepare` --> `poll` --> `check` --> `close callback`

1. 定时器，本阶段已经安排的 `setTimeout` `setInterval` 函数
2. 待定回调：执行延迟到下一个循环执行的IO回调
3. idle, prepare：仅系统内部使用
4. poll轮询：检索新的 I/O 事件;执行与 I/O 相关的回调（几乎所有情况下，除了关闭的回调函数，它们由计时器和 setImmediate() 排定的之外），其余情况 node 将在此处阻塞。
5. check 检测：setImmediate() 回调函数在这里执行。
6. close callbacks 关闭的回调函数：一些准备关闭的回调函数，如：socket.on('close', ...)

微任务和宏任务在Node的执行顺序：

1. 执行完一个阶段的所有任务（宏任务），即同一个事件循环里产生的宏任务（如setTimeout(fn, 0)）会先于微任务执行
2. 执行完nextTick队列的内容
3. 然后执行完微任务队列的内容

Node 11 以后，微任务和宏任务的执行顺序就和浏览器一致了
