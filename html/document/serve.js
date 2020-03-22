const http = require('http');
const path = require('path');
const fs = require('fs');

http.createServer(function (req,res) {
  if(req.url === '/document.js') {
    var filePath = path.resolve(__dirname,'./document.js')
    var file = fs.readFileSync(filePath)
    res.end(file)
  } else if (req.url === '/public/default') {
    var filePath = path.resolve(__dirname,'./default.jpg')
    var file = fs.readFileSync(filePath)
    res.end(file)
  } else {
    var filePath = path.resolve(__dirname,'./index.html')
    var file = fs.readFileSync(filePath)
    res.end(file)
  }
}).listen(1818,function () {
  console.log('start at 1818')
})