const http = require('http');
const fs = require('fs')
const server = http.createServer();


server.on('request' , function (req,res) {
  if(req.url === '/') {
    fs.readFile('./index.html' , function (err , data) {
      if(err) { console.log(err) } 
      else {
        res.write(data);
        res.end()
      }
    })
  }
})

server.on('request' , function (req,res) {
  if(req.url === '/get') {
    console.log(`${req.method} 请求`)
    console.log('req.headers' , req.headers)
    // res.writeHead(404, 'Not Found') 错误捕获
    res.end('success!')
    let reqData = ""
    req.on('data' , function (data) {
      reqData += data.toString()
    })
    req.on('end' , function () {
      console.log(reqData)
    })
  }
})



server.listen(8012 , function () {
  console.log('server is running at 8012')
})