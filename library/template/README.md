## 模板引擎

实现思路：

```
<%for ( var i = 0; i < users.length; i++ ) { %>
  <li>
    <a href="<%=users[i].url%>">
      <%=users[i].name%>
    </a>
  </li>
<% } %>
```

把以上模板代码转换成以下脚本代码：

```
var p = [];
for (var i = 0; i < users.length; i++) {
    p.push('<li><a href="');
    p.push(users[i].url);
    p.push('">');
    p.push(users[i].name);
    p.push('</a></li>');
}
```

通过上面的转换示例，我们可以用正则实现模板转换：

1. 将`%>`替换成`p.push('`
2. 将`<%`替换成`');`
3. 将`<%=xxx%>`替换成`');p.push(xxx);p.push('`
4. 使用`with`扩展作用域链，简化模板中变量的访问书写方式，如原本是`obj.name`可写成`name`
5. 使用`eval`或`new Function(arg1, body)`等手段来执行代码字符串

### 场景注意

1. 行终结符

字符编码值 | 转义序列 | 含义
---|---|---
\u000A | \n | 换行符
\u000D | \r | 回车符
\u2028 |  | 行分隔符
\u2029 |  | 段落分隔符

2. 特殊字符
  - `\`
  - `'`

3. 注意变量占位符为`undefined`的场景: `"'+\n(" + $1 + " == null ? '' : " + $1 + ")+\n'"`
