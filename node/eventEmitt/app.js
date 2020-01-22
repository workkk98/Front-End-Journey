const http = require('http')
const EventEmmiter = require('events').EventEmitter // 构造函数
const serve = http.createServer()
/**
 * 
 * @param {*} head 
 */
const fakerInstance = function (head) {
  let result = false
  while(head !== null) {
    if( EventEmmiter.prototype === head.__proto__ ) {
      result = true
    }
    head = head.__proto__
  }
  return result
}

console.trace("serve instance of EventEmmiter",fakerInstance(serve))  // true

// 此外 eventEmitter对象还有removeListener 和 newListener 事件 用来检测移除和添加事件监听器
serve.on('newListener', function (e,f) {
  console.log(e,f)
})

serve.once('request', function (req,res) {
  console.log('请求开始')
})

serve.on('request' , function (req,res) {
  if(req.url !== '/favicon.ico') {
    console.log(req.url)
  }
  res.end()
})

serve.once('request', function (req,res) {
  console.log('请求结束')
})

// 因为 removeListener(事件名, 函数指针) 和客户端的很相似 就不再使用 以及removeAllListeners(事件名)

// 注意下这点 .emit 手动触发挺有意思的 类似于客户端的dispatch 但区别还是很多
// 这里自定义事件 无需注册一个事件对象 客户端 document.createEvent()
serve.on('serveRunning', function (arg1,arg2) {
  console.log(arg1,arg2)
})

// 静态方法 EventEmmiter.listenerCount(emmiter对象, 事件名 )
console.log(EventEmmiter.listenerCount(serve,'request'))

serve.listen(1337, function () {
  serve.emit('serveRunning', 'serve running' , ' at 1337')
})


