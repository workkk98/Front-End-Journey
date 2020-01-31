const http = require('http')
const path = require('path')
const fs = require('fs')

http.createServer(function (req,res) {
  if(req.url === '/index') {
    let fileString = fs.readFileSync(path.resolve(__dirname, './index.html'))
    res.end(fileString)
  } else {
    res.end()
  }
}).listen(8080,function () {
  console.log('serve running')
})