var http  = require('http');
var fs = require('fs')
var path = require('path')

var serve = http.createServer(function (req,res) {
  console.log(req.url)
  if(req.url == '/index') {
    res.end('index')
  } else {
    var filePath = path.resolve(__dirname,'./index.html')
    var file = fs.readFileSync(filePath)
    res.end(file)
  }
})

serve.listen(1818,function () {
  console.log('http serve start at 1818')
})