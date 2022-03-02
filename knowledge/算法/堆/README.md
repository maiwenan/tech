## 堆

### 一个中心

堆的问题核心点就一个，那就是动态求极值。即动态求堆中的最大值/最小值等

### 两种实现

##### 跳表

建立索引方便快速搜索

##### 二叉堆

基本原理：

二叉堆就是一颗特殊的完全二叉树，其**父节点的权值不大于儿子的权值（小顶堆）**

数据结构实现：

l. 使用数组实现二叉堆，**数组下标一般从1开始存储** 
2. `出堆` 即取出根节点，并把最后一个节点作为新的根节点，然后执行`下沉`操作
3. `入堆` 即往二叉堆的最后插入一个节点，然后执行`上浮`操作

使用数组实现二叉堆的特点：

1. 节点在数组中下标为`i`时，则其左子节点下标为`i * 2`，右子节点的下标为`i * 2 + 1`
2. 节点在数组下标为`i`时，其父节点的下标为`Math.floor(i / 2)`

```js
class Heap {
  constructor() {
    this.queue = []
    this.size = 0
  }

  // 下沉操作
  down(index) {
    const item = this.queue[index]

    while (index <= this.size) {
      const child = index * 2

      // 有右子节点且右子节点比左子节点小
      if (child <= this.size && this.queue[child + 1] < this.queue[child]) {
        child += 1
      }
      if (item > this.queue[child]) {
        this.queue[index] = this.queue[child]
        index = child
      } else {
        break
      }
    }
    this.queue[index] = item
  }

  // 上浮操作
  up(index) {
    const item = this.queue[index]

    while (index >= 1) {
      const pIndex = Math.floor(index / 2)
      if (item < this.queue[pIndex]) {
        this.queue[index] = this.queue[pIndex]
        index = pIndex
      } else {
        break
      }
    }
    this.queue[index] = item
  }

  pop() {
    const item = this.queue[1]
    this.queue[1] = this.queue[this.size--]
    this.down(1)
  }

  push(item) {
    if (this.queue.length - 1 === this.size) {
      // 扩容，js 可跳过
    }
    this.queue[++this.size] = item
    this.up(this.size)
  }
}
```
