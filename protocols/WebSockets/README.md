# Web Sockets

### Web Sockets API

```js
// 入参是个绝对路径
var socket = new WebSockets(AbsolutePath)
```

通源策略对Web Sockets不适用。

> 与XMLHTTPRequest() API不同的是，浏览器在实例化了WebSocket对象后，就会马上创建连接。

* WebSocket.OPENING 0: 正在创建连接
* WebSocket.OPEN 1：已连接
* WebSocket.CLOSEING 2： 正在关闭连接
* WebSocket.CLOSE 3：已关闭

### 接受、发送API

```js

// 发送
socket.send(string)

// 接受
socket.onmessage = function (event) {
  console.log(event.data)
}
```

这两个API非常常见，例如XMLHTTPRequest.prototype.send()函数,  web workers的onmessage方法。
我想这就是一个约定俗成的规范，方便开发者使用。

* 值得强调的是，send方法的参数只能是string对象。
* 服务器返回的响应内容是在event.data里

### 生命周期

* open 建立链接
* error 发生错误后
* close 在连接关闭时触发

### WebSocket 心跳

因为是个长链接，需要客户端和服务端各自反应自己是online的，所以定时要发送一个心跳ping。


[零距离接触websocket](https://juejin.im/post/6876301731966713869)
这篇文章里关于websocket这个字段还是值得一看的。