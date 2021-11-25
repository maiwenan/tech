## 链表提纲

1. 一个原则（画图）
2. 两个考点
  - 修改指针
  - 拼接链表
3. 三个注意
  - 环
  - 边界
  - 前后序
4. 四个技巧
  - 虚拟头
  - 快慢指针
  - 穿针引线
  - 先穿再排后判空

## 链表基本信息

数组和链表同样作为线性的数组结构，二者在很多方便都是相同的，只在细微的操作和使用场景上有差异而已。

链表适合在数据需要有一定顺序，但是又需要进行频繁增删除的场景。

链表只有一个后驱节点 next，如果是双向链表还会有一个前驱节点 pre。（单向链表、双向链表）

数据结构：

```ts
interface ListNode<T> {
  data: T;
  next: ListNode<T>;
}
```

## 链表基本操作

### 插入

插入操作只需考虑插入位置的前驱节点和后继节点接口，其他节点无需考虑，因此时间复杂度为`O(1)`。

伪代码：

```js
// 单向链表：在`a->c`两节点建插入b节点
const c = a.next
a.next = b
b.next = c

// 双向链表：在`a->c`两节点建插入b节点
const c = a.next
a.next = b
b.prev = a
b.next = c
c.prev = b
```

### 删除

删除操作只需要把要删除节点的前驱节点的next指针修改为删除节点的下个节点即可（需要考虑边界条件）。

伪代码：

```js
// 在`a->b->c`中删除b节点
a.next = a.next.next

// 边界情况：删除第一个节点
head = head.next
```

### 遍历

伪代码：

```js
// 循环方式
while (!head) {
  console.log('打印当前节点', head)
  head = head.next
}

// 递归方式
dfs(cur) {
  if (cur === null) 
    return
  consle.log('打印当前节点', cur)
  return dfs(cur.next)
}
```

## 两个考点

### 指针的修改

指针修改最典型的就是链表反转。

实现代码：

```ts
/**
 * 循环方式
 * @param head 链表头节点
 * @param tail 链表尾节点
 */
function reverse(head: ListNode, tail: ListNode) {
  let prev = null
  let curr = head
  let next = null

  while (curr) {
    // 记录下一个节点
    next = curr.next
    // 修改当前节点的next指针
    curr.next = prev
    // 记录当前节点为上一个节点
    prev = curr
    // 开始下一个节点的遍历
    curr = next
  }
  return {
    head: tail,
    tail: head
  }
}

/**
 * 递归前序方式
 * @param head 当前节点
 * @param tail 上一个节点
 */
function reverse(head: ListNode, prev: ListNode) {
  if (!head) {
    return prev
  }
  const next = head.next

  head.next = prev
  reverse(next, head)
}

/**
 * 递归后序方式
 * @param head 当前节点
 * @param tail 上一个节点
 */
function reverse(head: ListNode) {
  if (!head || !head.next) {
    return head
  }
  const res = reverse(head.next)

  head.next.next = head
  // 后序方式：需要注意链表头置空边界问题
  head.next = null
  return res
}
```
