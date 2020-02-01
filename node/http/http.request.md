# HTTP客户端

之前学的是服务端http.createServer() 现在我们看看客户端的表现.

```
var req = http.request(options , function (response) {
  // response 是个 http.incomingMessage(就是服务端的request对象嘛😊)
})
```

* options是个对象或字符串(字符串会被url模块解析成对象)
* 匿名函数是当获取目标网站响应流时调用的回调函数

#### req对象(http.ClientRequest)

上面有响应的监听函数 也可以通过监听事件的方法

```
req.on('response' , function (res){

})
```

**req.write(\[chunk] , \[encoding])**

类似于httpServer对象 server.write()

**req.end()**
必须通过这个办法结束本次请求

**req.abort()**

**error**
error事件

**socket事件**

当建立连接的过程中，为该连接分配端口时，会触发req的socket事件。
```
req.on('socket', function (socket) {
  socket.setTimeout(1000)
  socket.on('timeout' , function () {
    req.abort()
  })
})
```

假设socket长时间未建立触发错误 err.code = 'ECONNRESET'

**req.setTimeout**
和上面一样的效果
