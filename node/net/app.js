const net = require('net')

var server = net.createServer({
  allowHalfOpen: false
} , function (socket) {
  server.getConnections(function (err,count) {
    console.log('现在的连接数' , count)
  })
  // server.close(function (err) {
  //   console.log('TCP服务器被关闭')
  // })
}) 

server.on('connection' , function (socket) {
  // let address = socket.address()
  // console.log('socket对象address信息为%j' , address)
  socket.setEncoding('utf8')
  socket.on('data' , function (data) {
    console.log('data ' , data)
  })
})

server.listen(8012, function () {
  console.log('tcp server running at 8012')
  // var adress = server.address()
  // console.log('被监听的地址是%j' , adress)
})