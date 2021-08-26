const http = require('http')
const fs = require('fs')
const server = http.createServer();

server.on('request' , function (req,res) {
  if(req.url === '/') {
    res.setHeader('Content-Type', 'text/html')
    res.setHeader('Set-Cookie' , 'username=zxf;HttpOnly=true')
    fs.readFile('./app.html',function (err,data) {
      if(err) console.error(err)
      else {
        res.end(data)
      }
    })
  }
})

server.on('request' , function (req,res) {
  if(req.url === '/delete') {
    console.log(req.headers['referer']) // 防范方法 来源地址
    console.log(req.headers['origin'])
    res.setHeader('Access-Control-Allow-Origin' , '*')
    console.log('假设 这步操作是删除了某些内容');
    res.end('//成功删除xx');
  }
})

server.listen(8014 , function () {
  console.log('server is runngin at 8014')
})