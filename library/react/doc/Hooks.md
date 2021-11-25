## Hooks

### 理念

### Hooks 实现思路

工作原理：

- 通过一些途径产生更新，更新会造成组件`render`
- 组件`render`时，`useState`返回更新后的结果

`更新`的数据结构可以如下：

```
const update = {
  // 更新执行的函数
  action,
  // 与同一个hook的其他更新形成的链表，会形成一个环状单向链表
  next: null
};

const [num, updateUnum] = useState(0);

// 以下会产生3个update
updateUnum(num => num + 1);
updateUnum(num => num + 1);
updateUnum(num => num + 1);
```

`更新`产生的`update`对象最终会保存在Hoook的`queue`属性中。

`FunctionComponent`每个hook对象保存在对应的`fiber`节点的`memoizedState`属性中。

模拟React调度更新流程:

- 从`fiber.memoizedState`逐个取出当前的hook，即: `workInProgressHook = workInProgressHook.next`
- 计算`state`，从当前`workInProgressHook`中取出所有`update`对象，并基于`workInProgressHook.memoizedState`为初始值，逐个调用`update.action`计算最终状态值


### Hooks 数据结构

React中 `mount` 和 `update` 调用的hook是不同的两个函数，React会根据是`mount`还是`update`把对应的`dispatcher`赋值给全局变量`ReactCurrentDispatcher`的`current`属性。

```
ReactCurrentDispatcher.current =
      current === null || current.memoizedState === null
        ? HooksDispatcherOnMount
        : HooksDispatcherOnUpdate; 
```

hook的数据结构:

```
const hook: Hook = {
  // Hooks链表中保存的单一hook对应的数据，不同hook，保存的数据类型不一样
  memoizedState: null,
  baseState: null,
  baseQueue: null,
  // hooks 链表，指向下一个hook
  next: null
}
```
