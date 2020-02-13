# net

#### 准备篇

macOS 
netcat命令行

```
netcat hostname port
```

#### 创建TCP服务器

**开启服务器**
```
// net.createServer([options] , [connectionListeners])
var server = net.createServer({
  allowHalfOpen: false // 默认为false  
} , function (socket) {})
```

这里的 \[connectionListeners]，即建立链接后的回调函数

**关闭服务器**
```
server.close(function () {

})
```

**建立链接**
```
server.on('connection' , function (socket) {
  // let address = socket.address()
  // console.log('socket对象address信息为%j' , address)
  socket.on('data' , function (data) {
    console.log('data %j' , data.toString())
  })
})
```

data可以通过两种方式解析
1. socket.setEncoding()
2. data.toString()

