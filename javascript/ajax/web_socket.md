# Web Socket

同源策略对Web Socket 不适用 ，能否通信 看服务器。

1. 开启和关闭
实例化，Web Socket后，浏览器会马上尝试创建连接
关闭 通过 socket.close()

```
var socket = new WebSocket("ws://wwww.example.com/serve.php")

socket.close()
```

2. 发送和接受数据

socket.send("Hello world!") // 字符串格式
对象用JSON字符串格式传输

socket.onmessage = function (event) {
  var data = event.data // 字符串格式的data
}

3. 其他事件

open
socket.onopen = function () {

}

error
socket.onerror = function () {
  
}

close
socket.onclose = function () {
  
}


