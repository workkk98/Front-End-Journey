const http = require('http')
const fs = require('fs')
const serve = http.createServer()

serve.on('request' , function (req,res) {
  if(req.url === '/get') {
    try {
      res.writeHead(200, 'OK');
    } catch(error) {
      console.error(error)
    }
    res.end('give u something')
  }
})

serve.on('request' , function (req, res) {
  if(req.url === '/index.html' || req.url === '/index.js') {
    fs.readFile('.'+req.url , function (err,data) {
      if(err) {
        console.error(err)
      } else {
        res.end(data)
      }
    })
  }
})

serve.on('request' , function (req, res) {
  if(req.url === '/post') {
    res.writeHead(404,'Not Found')
    res.end()
  }
})


serve.listen(7012 , function () {
  console.log('serve is running')
})
