const http = require('http')

const server = http.createServer();

server.on('error' , function (err) {
  console.log(err.code)
  server.close()
})

server.on('request' , function (req,res) {
  if(req.url == '/') {
    req.on('data' , function (data) {
      console.log(data.toString())
    })
    req.on('end' , function () {
      res.write('I want say')
      res.addTrailers({ 'Content-Md5' : '123456'})
      res.end('nothing')
    })
  }
})

server.listen('8012' , function () {
  console.log('server is runnging at 8012')
})