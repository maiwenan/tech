## 继承

#### 原型链继承（利用构造函数的prototype实现集成）

```
function Parent(name) {
  this.name = name;
}
Parent.prototype.getName = function() {
  return this.name;
}
function Child() {}
Child.prototype = new Parent('tom');

const child = new Child();
console.log(child.getName()); // tom
```

缺点：

1. 原型对象的属性被所有实例共享
2. 子类实例化时无法向父类传参
3. `Child.prototype.constructor`属性没有指向`Child`构造函数

#### 借用构造函数（经典继承）

```
function Parent(name) {
  this.name = name;
}
function Child(name) {
  Parent.call(this, name);
}

const child1 = new Child('tom');
const child2 = new Child('cat');
console.log(child1); // tom
console.log(child2); // cat
```

1. 解决原型对象的属性被所有实例共享问题
2. 子类实例化时可以向父类传参

缺点：

1. 父子类代码具有强依赖关系（耦合度高）
2. 每次实例化都需要调用父类构造函数，重新创建一遍方法
3. 在父构造函数`Parent.prototype`中定义的方法，无法被`Child`实例所继承

#### 组合继承

```
function Parent(name, colors) {
  this.name = name;
  this.colors = ['red', 'blue', 'green'];
}
Parent.prototype.getName = function() {
  return this.name;
}
function Child(name) {
  Parent.call(this, name);
}
Child.prototype = new Parent();
Child.prototype.constructor = Child;

const child1 = new Child('tom');
const child2 = new Child('cat');

child1.colors.push('black');
console.log(child1.getName()); // tom
console.log(child1.colors); // ['red', 'blue', 'green', 'black']
console.log(child2.getName()); // cat
console.log(child2.colors); // ['red', 'blue', 'green']
```

1. 融合了原型链继承和借用构造函数继承的优点，能实现父构造函数原型定义的方法，被`Child`实例所继承，是 JavaScript 中最常用的继承模式。

缺点：

1. 调用两次父构造函数

#### 原型式继承

```
function createObj(obj) {
  function F() {}
  F.prototype = obj
  return new F()
}
```

ES5 Object.create 的模拟实现，将传入的对象作为创建的对象的原型。

缺点：

1. 原型对象的属性被所有实例共享


#### 寄生式继承

创建一个仅用于封装继承过程的函数，该函数内部以某种形式来做**增强对象**，最后返回对象。

```
function createObj (o) {
    var clone = Object.create(o);
    clone.sayName = function () {
        console.log('hi');
    }
    return clone;
}
```

缺点：

1. 创建实例的时候，都需要重新创建一遍方法

### 寄生式继承

创建一个仅用于封装继承过程的函数，该函数内部以某种形式来做增强对象，最后返回对象。

```
function createObj (o) {
    var clone = Object.create(o);
    clone.sayName = function () {
        console.log('hi');
    }
    return clone;
}
```

缺点：

1. 创建实例的时候，都需要重新创建一遍方法

#### 寄生组合式继承

主要要解决组合继承两次调用父构造函数问题，通过间接的让`Child.prototype`访问到`Parent.prototype`

```
function Parent(name) {
  this.name = name;
  this.colors = ['red', 'blue', 'green'];
}
Parent.prototype.getName = function () {
  console.log(this.name)
}
function Child(name, age) {
  Parent.call(this, name);
  this.age = age;
}
// 关键的三步
function F() {};
F.prototype = Parent.prototype;
Child.prototype = new F();
Child.prototype.constructor = Child;

const child1 = new Child('kevin', '18');
console.log(child1);
```

结合上面代码实现、原型式继承以及寄生式继承，可以实现以下代码封装：

```
// 原型式继承
function createObj(o) {
  function F() {};
  F.prototype = o;
  return new F();
}
// 寄生式继承
function prototype(child, parent) {
  const prototype = createObj(parent.prototype);
  prototype.constructor = child;
  child.prototype = prototype;
  return child;
}
// 使用
prototype(Child, Parent);
```
