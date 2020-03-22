const fs = require('fs')
const http = require('http')

const serve = http.createServer()

serve.on('request' , function (req,res) {
  if(req.url === '/') {
    fs.readFile('./index.html', function (error , data) {
      if(error) {
        console.error(error)
      } 
      res.setHeader('Set-Cookie' , 'name=Nicholas')
      res.end(data)
    })
  }
})

serve.on('request' , function (req,res) {
  if(req.url === '/get') {
    res.setHeader('Set-Cookie' , 'get=getValue')
    res.end()
  }
})

serve.on('request' , function (req,res) {
  if(req.url === '/favicon.io') {
    res.end()
  }
})

serve.listen( 8012 , function () {
  console.log('serve is runnint at 8012')
})