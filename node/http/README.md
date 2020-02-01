# http模块

http模块是node.js内置的 所以直接require('http')即可

#### http.createServe(callback)

我实际上前段时间都是使用http.createServe() 中的回调函数来实现 响应客户端的请求的
```
var server = http.createServe(function (req,res) {
  // ...
})
```

### server对象

后来看到了eventEmitter章节，我了解到 server对象是继承自EventEmitter函数的 也就是说，
serve可以有监听事件类似于这样

```
server.on('request' , function (req,res) {
  //...
})
```
on方法就是addEventListener()方法的一个别称

server.listen(port , \[host] , \[backlog] , \[callback])
* port 端口号，0随机分配
* host 指定需要监听的地址，如果省略该参数，服务器监听来自于任何IPV4地址的客户端的连接(HTTP里也有个首部必须字段HOST，这个HOST指明了请求的目的地址)
* backlog 用于指定位于等待队列的客户端连接的最大数量，超过则拒绝新的客户端的连接 默认值511
* callback 触发listen事件后的回调函数(也可以用serve.on('listen')监听该事件)

server.close() 关闭服务器 触发close事件

**port被占用**

触发error事件，并error.code为'EADDRINUSE'
```
server.on('error' , function (error) {
  // port被占用时 会触发error事件 
  if(error.code === 'EADDRINUSE') {
    console.log('port 被占用')
  }
})

```

**connection事件**

server.on('connection' , callback )

**timeout事件**

设置服务器超时时间
* server.setTimeout(msec , callback)
* server.timeout = 1000 ;server.on('timeout' , callback)

#### req(http.incomingMessage对象)

req这个对象用来读取 客户端请求流中的数据,所以每当读取到data,都会触发data事件.当读取完毕后触发end事件。
这像极了ajax中的readState = 3(响应流接受后周期性触发)和 4(响应接受完毕)时候的样子。

一些req的属性
| 属性名 | 内容 |
| :---: | :--: |
| method | 请求的方法 |
| httpVersion | HTTP请求的版本 |
| url | 实际上是请求的资源路径path 例如: /index |
| headers | 请求首部字段 |
| trailers | end事件触发后 才能获得这条信息 |
| socket | 服务器端用于监听客户端请求的socket对象 |


**data事件**

```
// 收到请求流中的数据后都会触发data事件
req.on('data' , function (data) {
  // decodeURIComponent(data)
})
```

**end事件**


接受完毕后，触发end事件
```
req.on('end' , function () {
  console.log('服务端接受数据完成 ')
})
```

#### 解析req.url

**querystring**
node.js提供了这个模块 对URL中的query字符串进行解析
querystring.parse(str , \[sep] , \[eq] , \[options])
* str: 解析的字符串
* sep: 分解符号默认'&'
* eq: 等价符号'='
* options: {maxKeys: Number} 意思是返回对象属性最大数量

querystring.stringfy(str , \[sep] , \[eq] )

**url**
对完整的URL字符串进行转换

```
var targetUrl = url.parse(urlStr , [parseQueryString])

//parseQueryString 布尔类型参数 决定内部是否对**url中的query字符串**进行解析

```
经过url.pars() 转换后的对象，
即targetUrl这个对象里有这些属性
* href 原先url字符串
* protocol 协议
* host 完整的地址及端口号，可能是主机名或是IP号
* hostname 完整的地址
* port 端口号
* path 请求路径包含查询字符
* pathname 请求路径不包含查询字符
* search 查询字符串包含"?"
* query 查询字符串不包含"?"
* hash 散列字符串,包含"#" 前端应该叫锚点

#### res(http.serverResponse)

**响应头相关**

**res.writeHead(statusCode , \[responsePhrase] , \[headers])**
```
// 类似这样
res.writeHead(200 , 'OK' , {
  'Set-Cookie': [`year=2020` , 'month=02']
})
```
假如value是多个值 例如指定Set-Cookie , value得是字符串数组
调用后立即发送响应头(res.headerSent可以证明)

res.setHeaders(name , value)
假如value是多个值 例如指定Set-Cookie , value得是字符串数组

获取响应头
res.getHeader(name)

移除响应头
res.removeHeader(name)

boolean值 反应响应头是否发送
res.headersSent

**res.statusCode**
除了writeHead方法修改状态码 通过这个熟悉也可以修改和读取状态码

**res.sendDate**
通过这个属性是个boolean值 是否发送Date字段

**res.addTrailers()**
需要追加的响应头信息。

**res.write(chunk , \[encoding])**
类似于writeHead方法 ， 调用后立即发送请求头以及write参数中的指定内容
chunk可以是字符串 也可以是buffer
encoding是编码字符串 例如'utf-8'

返回一个布尔值 ， true值 表示内容发送到了系统内核缓存区？
false值 表示内容发送到了内存区

**res.end(chunk , \[encoding])**
结束响应的书写类似res.write()


**响应超时的处理**
```
res.setTimeout(msec , \[callback])

//callback可省略 所以可以在事件中定义
res.on('timeout', function () {

})
```

>假设 用户没在这两者上设置回调函数，服务器会自动关闭连接，如果用户设立了 则不会自动关闭
