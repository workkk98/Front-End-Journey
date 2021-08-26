const http = require('http')
const server = http.createServer();
const fs = require('fs')
server.on('request' , function (req,res) {
  if(req.url === '/') {
    fs.readFile('./app2.html',function (err,data) {
      if(err) console.error(err)
      else {
        res.end(data)
      }
    })
  }
})

server.listen(8015 , function () {
  console.log('server is runngin at 8015')
})