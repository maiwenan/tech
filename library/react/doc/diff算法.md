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
