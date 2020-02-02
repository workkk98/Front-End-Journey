// zhf19980116

// 值得一提的是 https在chrome较高的版本访问不了 建议curl命令行来访问
const https = require('https')
const fs = require('fs')

try {
  var pk = fs.readFileSync('./openssl/privatekey.pem')
  var pc = fs.readFileSync('./openssl/certificate.pem')
} catch(err) {
  console.error(err)
}

let opts = {
  key: pk,
  cert: pc
}
const server = https.createServer(opts , function (req,res) {
  if(req.url !== "/favicon.ico") {
    res.setHeader('Content-Type' , 'text/html');
    res.write('<!DOCTYPE html><html><head><meta charset="UTF-8"></head>')
    res.write('<body>hello');
    res.end('world<body></html>')
  }
})

server.listen(443 , function () {
  console.log('server is running at default port 443')
})