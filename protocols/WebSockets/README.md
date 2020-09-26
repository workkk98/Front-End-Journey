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
这篇文章里关于websocket的请求响应头字段还是值得一看的。

### 请求头和响应头

```HTTP
// request headers
Accept-Language: zh-CN,zh;q=0.9,en;q=0.8
Cache-Control: no-cache
Connection: Upgrade
Host: localhost:3000
Origin: http://localhost:52330
Pragma: no-cache
Sec-WebSocket-Extensions: permessage-deflate; client_max_window_bits
Sec-WebSocket-Key: TysbuHsx37RohDG2AvLblw==
Sec-WebSocket-Version: 13
Upgrade: websocket

// response headers
Connection: Upgrade
Sec-WebSocket-Accept: NfChBMZ/95IwRgftlHZngH/uP2s=
Upgrade: websocket
```

```Sec-WebSocket-Key```这个字段由浏览器随机生成。
[有趣的文章](https://www.zhihu.com/question/20215561/answer/40316953)