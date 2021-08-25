## 深拷贝

定义：将一个对象从内存中完整拷贝下来，从堆内存中开辟一个新的区域存放新对象，且修改新对象不会影响原对象。

### 注意点

1. 递归遍历深层级的对象
2. 考虑对象属性值是数组的情况
3. 循环引用情况（WeakMap[target]=newObj）
4. function 拷贝，通过 eval(`tmp.fn=${func.toString()}`)实现，同时也要考虑复制function属性的数据
5. null 引用类型
6. 其他对象类型拷贝（可遍历类型与不可遍历类型）
  - Number对象类型
  - String对象类型
  - Boolean
  - Date
  - Error
  - Symbol
  - RegExp
  - Object
  - Array
  - Map
  - Set
