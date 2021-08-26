const http = require('http')
const server = http.createServer();

server.on('request' , function (req,res) {
  if(req.url === '/') {
    console.log(req.headers)
    res.writeHead(200, 'OK' , {
      'Access-Control-Allow-Origin': req.headers.referer.slice(0,-1),
      'Access-Control-Allow-Credentials' : 'true',
      'Set-Cookie': 'app2=new'
      // 可以跨域设置cookie...
    })
    res.end()
  }
})

server.listen(8013 , function () {
  console.log('server is runngin at 8013')
})