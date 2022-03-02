## 滑动窗口

### 类型

- 固定窗口大小，即同时移动 l 和 r
- 可变窗口大小，即 r 移动，根据条件判断是否移动 l，或者 l 移动，根据条件判断是否移动 r

### 算法模板

```
初始化慢指针 = 0
初始化 ans 
for 快指针 in 可迭代集合 {
  更新窗口内信息
  while (窗口内不合符题意) {
    扩展或收缩窗口
    慢指针移动
  }
  更新答案
}
返回 ans
```

### 特点

- 识别判断条件
  - 判断是否包含子串所有字符（长度可不一样或者长度一样），方法可通过map记录字符数量或者通过charCodeAt配合数组记录数量
- 通过 `Set` 等方式记录子串，如果是数字求和，则可直接计算 `total` 值
- 通过 `Map` 记录元素是否出现过或者出现次数
- 可通过 `ansL` 和 `ansR` 记录符合条件的字符串位置
- 满足条件情况下，根据题意更新结果的最小/最大值


### 典型题目

- https://leetcode-cn.com/problems/minimum-size-subarray-sum/
- https://leetcode-cn.com/problems/longest-substring-without-repeating-characters/
- https://leetcode-cn.com/problems/minimum-window-substring/submissions/
- https://leetcode-cn.com/problems/find-all-anagrams-in-a-string/
- https://leetcode-cn.com/problems/fruit-into-baskets/
