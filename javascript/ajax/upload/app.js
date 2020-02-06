const http = require('http')
const fs = require('fs')

server = http.createServer()

server.on('request' , function (req,res) {
  if(req.url === '/') {
    fs.readFile('./index.html' , function (err,data) {
      if(err) console.log(err);
      else {
        res.end(data)
      }
    })
  }
})

server.on('request' , function (req,res) {
  if(req.url === '/upload') {
    let dataArray = []
    req.on('data' , function (data) {
      dataArray.push(data)
    })
    req.on('end', function () {
      const buffer = Buffer.from(dataArray)
      fs.writeFile('./upload.jpg', buffer , function () {
        console.log('success')
      })
      res.end('end')
    })
  }
})

server.listen(8012 , function () {
  console.log('server is running at 8012')
})