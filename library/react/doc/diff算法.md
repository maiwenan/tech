## Diff 算法

### Diff算法中的概念

1. `current Fiber` 如果该DOM节点已在页面中，`current Fiber`代表该DOM节点对应的Fiber节点。
2. `workInProgress Fiber` 如果该DOM节点将在本次更新中渲染到页面中，`workInProgress Fiber`代表该DOM节点对应的Fiber节点。
3. DOM节点本身
4. `React Element` 即`ClassComponent`的`render`方法的返回结果，或`FunctionComponent`的调用结果，包含描述DOM节点的信息。

Diff算法的本质是对比1和4，生成2。

### Diff 算法预设的三个限制

1. 只对同级元素进行diff，如果一个dom节点在前后两次更新中处于不通层级，那么react不会尝试复用他
2. 两个不同类型的元素会产生出不同的树。如果元素由div变为p，React会销毁div及其子孙节点，并新建p及其子孙节点。
3. 开发者可以通过设置 `key` 属性来表明哪些子元素在不同的渲染下保持稳定（主要用来提高可复用元素在不同顺序位置时的更新效率）

### Diff 的实现分类

主要是依据本次更新中`newChild`（即概念4中的`React Element`）的类型决定:

1. 如果`newChild`类型是`object` , `number`, `string`中的一种，即代表在这次更新中，同级元素只有一个节点
2. 如果`newChild`类型是`Array`，则代表同级元素中有多个节点

### 单节点 Diff

Diff 的流程：

1. 判断上次更新时的Fiber节点是否存在对应的DOM节点
2. 如果存在，则继续判断DOM节点是否可以复用
3. 如果DOM节点可以复用，则将上次更新的Fiber节点的副本作为本次新生成的Fiber节点并返回（即复用了原来Fiber节点）
4. 如果1中的判断不存在DOM节点，则新生成一个Fiber节点并返回
5. 如果2中的判断DOM节点不可复用，同样也新生成一个Fiber节点并返回

如何判断DOM节点是否可复用：

1. 先判断DOM节点是否存在
2. 比较`current fiber`和`newChild`的key值是否一致
3. 比较`current fiber`和`newChild`的类型是否一致

满足以上三个条件即可判断DOM节点可复用

### 多节点 Diff

多节点主要有以下 Diff 场景或组合：

1. 节点更新，即节点属性变化或节点类型变化

2. 节点新增或减少

3. 节点位置变化

整体处理逻辑会经历两轮遍历：

- 第一轮遍历：处理更新的节点
- 第二轮遍历：处理剩下的不属于更新的节点


### 第一轮遍历

1. 遍历 `newChildren`（本次要更新的内容），将 `newChildren[i]` 与 `oldFiber` 比较，判断DOM节点是否可复用
2. 如果可以复用，则继续遍历下一个节点，即比较 `newChildren[i++]` 与 `oldFiber.sibling`，可以复用则继续遍历
3. 如果不可以复用，分两种情况：

    - `key`不同导致不可复用：立即跳出整个遍历，第一轮遍历结束
    - `key`相同，但类型不同导致不可复用：将`oldFiber`标记为`DELETION`，并继续遍历

4. 如果`newChildren`遍历完（即`i === newChildren.length - 1`）或者`oldFiber`遍历完（即`oldFiber.sibling === null`），跳出遍历，第一轮遍历结束。

其中步骤3跳出遍历有1种情况：

- `newChildren`没有遍历完，`oldFiber`也没有遍历完

其中步骤4跳出遍历有3种情况：

- `newChildren`和`oldFiber`同时遍历完，即只需在第一轮遍历进行组件更新 (opens new window)。此时Diff结束。
- `newChildren`遍历完，`oldFiber`没有遍历完，即本次更新比之前的节点数量少，有节点需要删除
- `newChildren`没有遍历完，`oldFiber`遍历完，即本次更新比之前的节点数量多，有节点需要插入
- `newChildren`和`oldFiber`都没有遍历完，即有节点移动的场景，diff算法会稍微复杂些。

### 第二轮遍历

> 考虑性能，尽量减少将节点从后面移动到前面的操作

为了快速找到`key`对应的`oldFiber`，需要使用`key-value`的方式存储`oldFiber`的节点，即：

```
const existingChildren = mapRemainingChildren(returnFiber, oldFiber);
```

接下来遍历剩余的`newChildren`，通过`newChildren[i].key`就能在`existingChildren`中找到`key`相同的`oldFiber`

如何判断节点是否移动？

节点是否移动的参照物是：最后一个可复用节点在`oldFiber`中的位置索引（用变量`lastPlacedIndex`）表示。

由于本次更新中节点是按`newChildren`的顺序排列。
在遍历`newChildren`过程中，每个遍历到的可复用节点一定是当前遍历到的所有可复用节点中最靠右的那个，
即一定在`lastPlacedIndex`所对应的可复用节点的位置后面。

所以只需要比较遍历到的可复用节点在上次更新时是否也在`lastPlacedIndex`对应的`oldFiber`后面，就能知道两次更新中这两个节点的相对位置改变没有。

我们用变量`oldIndex`表示遍历到的可复用节点在`oldFiber`中的位置索引，即`oldIndex = oldFiber.index`。
如果`oldIndex` < `lastPlacedIndex`，代表本次更新该节点需要向右移动。

`lastPlacedIndex`初始为0，每遍历一个可复用的节点，如果`oldIndex >= lastPlacedIndex`，则`lastPlacedIndex = oldIndex`。
