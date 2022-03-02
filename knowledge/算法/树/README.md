## 树

> https://leetcode-solution-leetcode-pp.gitbook.io/leetcode-solution/thinkings/tree

### 基本概念

树是一种非线性数据结构。树结构的基本单位是节点。节点之间的链接，称为分支（branch）。节点与分支形成树状，结构的开端，称为根（root），或根结点。根节点之外的节点，称为子节点（child）。没有链接到其他子节点的节点，称为叶节点（leaf）。

节点数据结构：

```
interface Node {
  // 当前节点的值
  value: any;
  // 节点的子节点
  children: Array<Node>;
}
```

二叉树节点的数据结构可以是：

```
interface Node {
  // 当前节点的值
  value: any;
  // 左子节点
  left: Node | null;
  // 右子节点
  right: Node | null;
}
```

### 一个中心：树的遍历

从访问优先级出发，有两种遍历类型：

1. 深度优先遍历
2. 广度优先遍历

从节点的处理先后顺序出发，有三种遍历方式：

1. 前序遍历
2. 后序遍历
3. 中序遍历

从编码方式出发，遍历有两种写法：

1. 递归写法（最常见）
2. 迭代写法

#### 迭代写法（双色标记法）

双色标记法算法原理：

1. 使用颜色标记节点的状态，新节点为白色，已访问的节点为灰色
2. 如果遇到的节点为白色，则将其标记为灰色，然后将其右子节点、自身、左子节点依次入栈
3. 如果遇到的节点为灰色，则将节点的值输出

代码示例（中序遍历方式）：

```ts
function inorderTraversal(root) {
  const WHITE = 0
  const GRAAY = 1
  const colors = [0]
  const nodes = [root]
  let res = []

  while (nodes.length > 0) {
    const color = colors.pop()
    const node = nodes.pop()

    // 先访问左子节点，再访问节点本身，最后访问右子节点（即中序遍历）
    // （栈是先入后出，所以左子节点最后入栈）
    if (color === WHITE) {
      colors.push(WHITE)
      nodes.push(node.right)
      colors.push(GRAAY)
      nodes.push(node)
      colors.push(WHITE)
      nodes.push(node.left)
    } else {
      res.push(node.val)
    }
  }
  return res
} 
```


### 两个基本点：深度优先遍历和广度优先遍历

#### 深度优先遍历（DFS）

##### 算法原理

1. 首先将根节点放入到栈中
2. 从栈中取出第一个节点，并检验他是否为目标。如果找到目标，则结束搜索并回传结果。否则将他某个尚未检查过的直接子节点加入栈中。
3. 重复步骤2
4. 如果不存在未检测的直接子节点，则将上一级节点加入栈中，重复步骤2
5. 重复步骤4
6. 若栈为空，表示整颗树都检查过了，即没有找到目标。

**这里的`栈`可以理解为自己实现的栈，也可以理解为调用栈。如果是调用栈的时候就是递归，如果是自己实现的栈的话就是迭代。**

##### 算法模板

```ts
function dfs(root) {
  if (满足特定条件) {
    // 返回结果或退出搜索
  }
  for (const node in root.children) {
    dfs(node)
  }
}
```

##### 二叉树算法模板

```ts
function dfs(root) {
  if (满足特定条件) {
    // 返回结果或退出搜索
  }
  dfs(root.left)
  dfs(root.right)
}
```

##### 前序遍历

```ts
function dfs(root) {
  if (满足特定条件) {
    // 返回结果或退出搜索
  }
  // 主要逻辑写在递归调用前，称前序遍历（即先处理当前节点再遍历处理其子节点）
  dfs(root.left)
  dfs(root.right)
}
```

##### 后序遍历

```ts
function dfs(root) {
  if (满足特定条件) {
    // 返回结果或退出搜索
  }
  dfs(root.left)
  dfs(root.right)
  // 主要逻辑写在递归调用后，称后序遍历（即先遍历处理其子节点再处理当前节点）
}
```

#### 广度优先遍历（BFS）

BFS 细分为带层的和不带层的，BFS 不是层次遍历，BFS 适合求最短距离。

BFS 的核心在于求最短问题时候可以提前终止，这才是它的核心价值，层次遍历是一种不需要提前终止的 BFS 的副产物。

##### 算法原理

1. 首先将根节点放入队列中
2. 从队里中取出第一个节点，检查它是否为目标节点
  - 如果是目标节点，则返回节点并结束搜索
  - 如果不是目标节点，则将它所有未被检查的子节点都加入队列中
3. 若队列为空，表示整棵树都查找完成了，即没有找到目标节点。
4. 重复步骤2

##### 算法模板

1. 基础模板：

```ts
function bfs(root) {
  const queue = [root]
  // 记录节点是否被访问过（可选）
  const visited = new WeakMap()
  
  // 循环遍历队列
  while (queue.length > 0) {
    // 取出第一个节点
    const node = queue.shift()

    // 记录和处理节点是否被访问过
    if (visited[node]) {
      continue
    } else {
      visited[node] = true
    }

    if (node 是目标节点) {
      return node
    }
    for (let item in node.children) {
      queue.push(item)
    }
  }
}
```

2. 标记层模板：

```ts
// 利用的特点：
// 1. 当前层级所有节点遍历完成时，队列中只包含下一层级的节点，这时 queue.length 就是下一层级的节点数量
// 2. 根据1中的特点，每一层级开始，遍历完queue.length数量的节点就说明当前层级的所有节点遍历完毕，此时可以标记 level++ ，即层级+1
function bfs(root) {
  const queue = [root]
  const visited = new WeakMap()
  let level = 0

  // 按层循环遍历
  while (queue.length > 0) {
    // 第 level + 1 层的树节点数量
    const len = queue.length;

    // 遍历 level + 1 层内所有节点
    for (let i = 0; i < len; i++) {
      const node = queue.shift()

      if (visited[node]) {
        continue
      } else {
        visited[node] = true
      }
      if (node 是目标节点 OR level 满足层级要求) {
        return node
      }
      // 把子节点加入队列中等待处理
      for (let item in node.children) {
        queue.push(item)
      }
    }

    // 当前层级的所有树节点遍历完，即当前层级所有树节点都从队列取出
    level++
  }
}
```


**BFS 可以通过在当前节点信息记录父节点，然后向上回溯找到【根节点到当前节点的路径】，如下：**

```ts
const map = new WeakMap()

// 记录左右子节点对应的父节点
weakMap[node.left] = node;
weakMap[node.right] = node;
```

**DFS 我们借助的是栈来完成，而BFS这里借助的是队列（两者迭代遍历的算法模板相近）**


### 三种题型

##### 搜索类

1. dfs 搜索
2. bfs 搜索

##### 构建类

1. 普通二叉树构建
  - DFS 前序遍历构建二叉树
  - DFS 后续遍历构建二叉树
  - BFS 遍历构建二叉树
2. 二叉搜索树构建
  - 遍历序列构建二叉搜索树

```ts
/**
 * DFS 递归-根据前序遍历构造二叉搜索树
 * @param {number[]} preorder
 * @return {TreeNode}
 */
var bstFromPreorder = function(preorder) {
    // start为开始位置，end为结束位置（记住不是长度）
    function dfs(start, end) {
        if (start > end) {
            return null
        }
        if (start === end) {
            return new TreeNode(preorder[start])
        }
        const root = new TreeNode(preorder[start])
        let mid = -1

        for (let i = start + 1; i <= end; i++) {
            // 找到大于根节点的位置，该位置前面的元素都应该在跟节点左侧
            if (preorder[i] > root.val) {
                mid = i
                break
            }
        }
        if (mid === -1) {
            // 没有任何元素大于根节点
            root.left = dfs(start + 1, end)
        } else {
            root.left = dfs(start + 1, mid - 1)
            root.right = dfs(mid, end)
        }

        return root
    }

    return dfs(0, preorder.length - 1)
}
```

#####  修改类


### 四个重要概念

##### 二叉搜索树

特点：

- 时间复杂度是 $O(logN)
- 中序遍历是有序的，即：二叉搜索树的中序遍历的结果是一个有序数组

##### 完全二叉树

特点：给完全二叉树编号，父子之间就可以通过编号轻松求出。如已知一个节点的编号是 i，那么其左子节点就是 2i，右子节点就是 2i + 1，父节点就是 i / 2

计算二叉树的最大宽度：

```ts
function widthOfBinaryTree(root) {
  const queue = [[root, 0]]
  // let level = 0
  let leftPos = 0
  let max = 0

  while (queue.length > 0) {
    const len = queue.length
    let isNewLevel = true

    for (let i = 0; i < len; i++) {
      const [node, pos] = queue.shift()

      if (node) {
        queue.push([node.left, pos * 2])
        queue.push([node.right, pos * 2 + 1])

        if (isNewLevel) {
          isNewLevel = false
          leftPos = pos
        }
        max = Math.max(max, pos - leftPos + 1)
      }
    }
    // level++
  }

}
```


##### 路径

求二叉树的最大路径和，解题方法有两种：

1. 双递归法，复杂度$O(N^2)，由于子树路径和会被计算出来，可以推导父节点的最大路径和，因此有重复计算，可以使用记忆递归（缓存递归）
2. 全局记录最大值，只需要在递归的时候 return 当前的一条边（上面提了不能拐），并在函数内部计算以当前节点出发的最大路径和，并更新全局最大值即可。 这里的核心其实是 return 较大的一条边，因为较小的边不可能是答案

```ts
function maxPath(root) {
  let max = -Infinity
  function dfs(root) {
    if (!root) return 0
    const l = dfs(root.left)
    const r = dfs(root.right)

    max = Math.max(max, Math.max(l, 0) + Math.max(r, 0) + root.val)

    return Math.max(l, r, 0) + root.val
  }
  dfs(root)

  return max
}
```

##### 距离

与路径相似

### 技巧

##### 单/双递归

**如果题目有类似，任意节点开始 xxxx 或者所有 xxx**，可以考虑使用双递归

如果递归中有重复计算，可以加上使用缓存或记忆方法

双递归的基本套路就是一个主递归函数和一个内部递归函数，主递归函数负责计算以某一个节点开始的 xxxx，内部递归函数负责计算 xxxx，这样就实现了以所有节点开始的 xxxx ，其中 xxx 可以替换成任何题目描述，比如路径和等。

算法模板：

```ts
// 计算 xxx ，如路径和、距离等
function dfs_inner(root) {
  // 这里写主逻辑，就是前序遍历
  dfs_inner(root.left)
  dfs_inner(root.right)
  // 这里写主逻辑就是后续遍历
}
function dfs_main(root) {
  return dfs_inner(root) + dfs_main(root.left) + dfs_main(root.right)
}
```

##### 前后序遍历

1. 自顶向下就是在每个递归层级，首先访问节点来计算一些值，并在递归调用函数时将这些值传递到子节点，一般是通过参数传到子树中。
2. 自底向上是另一种常见的递归方法，首先对所有子节点递归地调用函数，然后根据返回值和根节点本身的值得到答案。

##### 虚拟节点

二叉树剪枝:

```ts
function pruneTree(root) {
  function dfs(root) {
    if (!root) {
      return true
    }

    const l = dfs(root.left)
    const r = dfs(root.right)

    if (l === true) {
      root.left = null
    }
    if (r === true) {
      root.right = null
    }
    return l && r && root.val !== 1
  }

  // 虚拟一个新的根节点
  const ans = new TreeNode(-1)

  ans.left = root
  dfs(ans)
  return ans.left
}
```

删除给定值的叶子节点:

```ts
function removeLeaf(root, target) {
  function dfs(root) {
    if (!root) return true

    const l = dfs(root.left)
    const r = dfs(root.right)

    if (l) root.left = null
    if (r) root.right = null
    return l && r && root.val === target
  }

  // 虚拟一个新的根节点
  const ans = new TreeNode(-1)

  ans.left = root
  dfs(ans)
  return ans.left
}
```


##### 边界

搜索类：

1. 判断节点是否为空

```ts
function dfs(root) {
  if (!root) {
    return '空节点：合适的、需要的数据';
  }
}
```

2. 判断是否为叶子节点

```ts
function dfs(root) {
  if (!root) {
    return '空节点：合适的、需要的数据';
  }
  if (!root.left && !root.right) {
    return '叶子节点：合适的、需要的数据';
  }
}
```

3. 下标判断大小或者相等处理情况

##### 参数扩展大法

1. 携带父节点或祖先节点信息

```ts

function dfs(root, parent) {
  if (!root) {
    return;
  }
  dfs(root.left, root);
  dfs(root.right, root);
}
```

2. 携带路径信息，可以是路径和或具体的路径数组等

```ts
// 路径和
function dfs(root, pathSum) {
  if (!root) {
    return pathSum;
  }
  dfs(root.left, pathSum + root.val);
  dfs(root.right, pathSum + root.val);
}

// 路径数组
function dfs(root, paths) {
  if (!root) {
    return paths;
  }
  paths.push(root.val)
  dfs(root.left, paths);
  dfs(root.right, paths);
  // 撤销
  paths.pop();
}
```
