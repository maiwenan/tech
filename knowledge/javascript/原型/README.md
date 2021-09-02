# 原型

> [JavaScript深入之从原型到原型链](https://github.com/mqyqingfeng/Blog/issues/2)

总结：

1. 构造函数都有一个`prototype`属性(猜测该属性的值是系统根据该函数声明生成的)
2. 构造函数的`prototype`属性对象有一个`constructor`属性是指向构造函数本身
3. 实例的原型对象指向构造函数的`prototype`属性，即`person.__proto__ === Person.prototype`
4. 访问实例的属性时，如果找不到就会找该对象原型中的属性，如果再找不到就找原型的原型，一直找对最顶层为止
5. 构造函数的`prototype`对象的原型指向object的`prototype`属性，即`Person.prototype.__proto__ === Object.prototype`
6. `Object.prototype.__proto__ === null`
7. `Function.__proto__ === Function.prototype`
8. `Person.__proto__ === Function.prototype`，但`Person.__proto__ !== Person.prototype`

以上就是原型链的主要知识，总结起来如下图所示。其中第7和第8点是js语言本身的实现，可能看起来会有点迷惑，了解即可

![image](https://i.loli.net/2021/03/11/ae4HSzNhVnPWtAM.png)
