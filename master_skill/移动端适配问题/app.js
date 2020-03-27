var http = require('http')
var fs = require('fs')

var server = http.createServer();

server.on('request', function (req,res) {
  fs.readFile('./index.html', function (err,data) {
    res.write(data);
    res.end()
  })
})


server.listen(8012, function () {
  console.log('server is running')
})