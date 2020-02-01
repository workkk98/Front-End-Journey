const http = require('http')

const server = http.createServer()

server.listen(1337,'127.0.0.1')

// listening 事件
server.on('listening' , function () {
  console.log('服务端监听at 1337')
  // server.close() 
})

// close事件
server.on('close', function () {
  console.log('服务端关闭')
})

// error事件
server.on('error' , function (error) {
  // port被占用时 会触发error事件 
  if(error.code === 'EADDRINUSE') {
    console.log('port 被占用')
  }
})

// connection事件
server.on('connection' , function (socket) {
  // console.log('连接建立')
})

// timeout事件 msec = millisecond 毫秒 设置服务器超时时间
server.setTimeout(1000 * 60 , function (socket) {
  console.log('服务器超时')
  // console.dir(socket)
})
// serve.timeout = 1000
// server.on('timeout' , function (socket) {})

// http.incomingMessage对象的属性
server.on('request' , function (req,res) {
  if(req.url !== '/favicon.ico') {
    console.log('请求的方法 ' , req.method)
    console.log('请求的版本号 ', req.httpVersion)
    console.log('请求的路径 ' , req.url)
    //console.log('请求的请求头对象 ', JSON.stringify(req.headers))
  }
})

// req的 data 和 end事件
server.on('request' , function (req,res) {
  if(req.url == '/postform') {
    req.on('data' , function (data) {
      console.log('服务端正在接受数据 ' , decodeURIComponent(data))
    })
    req.on('end' , function () {
      console.log('服务端接受数据完成 ')
    })
  }
})

// 响应如何写请求头及内容
server.on('request' , function (req,res) {
  if(req.url == '/response' && req.method === 'GET') {
    // res.writeHead(200 , 'OK' , {
    //   'Set-Cookie': [`year=2020` , 'month=02']
    // })
    res.setHeader('Set-Cookie', [`year=2020;expired=${new Date('2020-02-15').toGMTString()}` , 'month=02'])
    res.sendDate = false
    res.write('something')
    console.log('响应头:' , res.getHeader('Set-Cookie'))

    //console.log(res.headersSent)
    res.end()
  }
})

// 对res对象的超时处理  如果有设置回调 则不自动关闭socket 如果没有则自动关闭
// 没测试出来 删除回调后自动关闭连接的 情况
server.on('request' , function (req,res) {
  if(req.url == '/timeout' && req.method === 'GET') {
    res.setTimeout(1000,function () {
      console.log('响应超时')
    })
    setTimeout(function () {
      res.writeHead(200 , 'OK' , {
        'Content-Charset': 'utf-8'
      });
      res.end('服务器超时了 我仍能发 就是这么任性')
    },2000)
  }
})

