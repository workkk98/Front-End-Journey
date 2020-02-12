const http = require('http')
const fs = require('fs')
const server = http.createServer();

server.on('request' , function (req,res) {
  if(req.url === '/') {
    res.setHeader('Content-Type', 'text/html')
    res.setHeader('Set-Cookie' , 'user1=zxf;HttpOnly=true')
    fs.readFile('./demo.html',function (err,data) {
      if(err) console.error(err)
      else {
        res.end(data)
      }
    })
  }
})

server.listen(8012 , function () {
  console.log('server is runngin at 8012')
})