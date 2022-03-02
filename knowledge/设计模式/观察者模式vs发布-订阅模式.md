### 观察者模式

**观察者模式**：在软件设计中（Subject），一个对象维护一个列表（Observers），当发生任何变化时通知列表（即观察者）

### 发布-订阅模式

**发布-订阅模式**：消息发送方，叫做发布者（Publishers），消息不会直接发送给特定的订阅者（Subscriber）

### 区别

1. 观察者模式中，观察者是知道Subject的，而发布订阅模式中，订阅者是不知道发布者的存在
2. 在发布订阅模式中，组件是松散耦合的，而观察者则相反
3. 观察者模式大多是**同步**的，如事件触发；而发布订阅模式则大多是**异步**的，如消息队列
4. 观察者模式需要在单个应用程序的地址空间中实现，而发布订阅更像交叉应用模式（这是由于差异2决定的，即是否松散耦合）

### 观察者模式代码实现

```js
var subject = {
  observers: [],
  subscriber(observer) {
    this.observers.push(observer)
  },
  notify() {
    for (let i = 0; i < this.observers.length; i++) {
      this.observers[i].update()
    }
  }
}

var observer = {
  update() {

  }
}

subject.subscriber(observer)
subject.notify()
```


### 发布订阅模式代码实现

```js
var publisher = {
  publish(pubsub) {
    pubsub.publish()
  }
}
var pubsub = {
  subscribers: [],
  subscribe(subscriber) {
    this.subscribers.push(subscriber)
  },
  publish() {
    this.subscribers.forEach(subscriber => {
      subscriber.update()
    })
  }
}
var subscriber = {
  update() {

  }
  subscribe(pubsub) {
    pubsub.subscribe(this)
  }
}

subscriber.subscribe(pubsub)
publisher.publish(pubsub)

```
