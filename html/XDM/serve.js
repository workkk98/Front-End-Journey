const http = require('http');
const fs = require('fs');

const indexHTML = fs.readFileSync('./index.html')
const iframeHTML = fs.readFileSync('./iframe.html')

const serve = http.createServer();

serve.on('request', function (req,res) {
  if(req.url == '/index') {
    console.log('/index')
    res.end(indexHTML)
  }
})

serve.on('request', function (req,res) {
  if(req.url == '/iframe') {
    console.log('/iframe')
    res.end(iframeHTML)
  }
})

serve.listen(1818 , function () {
  console.log('serve is running')
})
