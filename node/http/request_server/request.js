const http = require('http')

const options = {
  hostname: '127.0.0.1',
  port: '8012',
  path: '/',
  method: 'POST',
  headers: {
    'Cache-Control': 'max-age=0'
  }
}

let reqData = '';

const request = http.request(options)

request.on('error' , function (err) {
  console.log(err.code);
  request.abort()
})

request.write('hello')
request.end('world')

request.on('response' , function (response) {
  response.on('data' , function (data) {
    reqData = reqData + data;
  })
  response.on('end' , function () {
    console.log('Trailer头信息%j ' , response.trailers)
  })
})