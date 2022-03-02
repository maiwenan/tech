## 三次握手和四次挥手

### 三次握手建立连接

1. 客户端 -------发送连接请求：同步标记位SYN=1，发送seq=x随机码-------> 服务端
2. 客户端(SYN_SEND状态) <------确认连接请求：确认标志位ACK=1，发送seq=y, ack=x+1随机码-------- 服务端(SYN_RCVD状态，半连接状态)
3. 客户端(ESTABLISHED) -------确认连接：确认标志位ACK=1，发送seq=x+1, ack=y+1随机码-------> 服务端(ESTABLISHED)

目的：确保客户端和服务端双方都


能确认对方是可以**发送和接收**数据包的

### 四次挥手关闭连接

1. 客户端 -------FIN(结束标记)-------> 服务端
2. 客户端 <------ACK(确认标记)-------- 服务端
3. 客户端 <------FIN--------> 服务端
4. 客户端 -------ACK-------> 服务端

注：客户端发送ACK后，等待2MSL后没有收到回复会进入 CLOSED 状态

MSL(Maximum Segment Lifetime): 报文最大生存时间。

等待2MSL时间主要目的是怕最后一个ACK包对方没收到，那么对方在超时后将重发第三次握手的FIN包，主动关闭端接到重发的FIN包后可以再发一个ACK应答包。

## HTTP2

### 多路复用

HTTP2 采用二进制格式传输，取代了HTTP1.x的文本格式，二进制解析效率更高。

HTTP2 的多路复用替代了HTTP1.X的序列和阻塞机制，所有域名相同的请求都通过同一个TCP连接完成请求。

在HTTP1.x中，并发多个请求需要多个TCP连接，浏览器为了控制资源会有6-8个TCP连接都限制。

- 相同域名下所有HTTP请求都在同一个TCP连接下完成，减少创建多个TCP连接带来的延时和性能消耗
- 单个TCP连接上可以并行发起多个HTTP请求及其响应，且互相之间互不干扰。