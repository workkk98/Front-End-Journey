const http = require('http')

const options = {
  hostname: 'localhost',
  port: 1337,
  method: 'GET',
  path: '/response',
  headers: {
    'User-Agent':'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36'
  }
}
// path包含查询字符串
const req = http.request(options)
console.log(req.getHeaders())
req.on('response' , function (response) {
  console.log(response.statusCode)
  response.setEncoding('utf-8')
  response.on('data' , function (chunk) {
    console.log('响应内容: ' , chunk)
  })
})

req.on('socket' , function (socket) {
  socket.setTimeout(1000)
  socket.on('timeout' , function () {
    req.abort()
  })
})

req.setTimeout(2000 , function () {
  console.log('timeout')
  req.abort()
})

req.on('error' , function (err) {
  console.error(err)
})

req.end()