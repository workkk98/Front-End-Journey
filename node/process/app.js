// console.log(process.argv.toString())


// process.stdin.resume()
// process.stdin.on('data' , function (chunk) {
//   process.stdout.write('进程收到的数据: ' + chunk)
// })

// process.memoryUsage()

function foo () {
  console.log('foo')
}

process.nextTick(function () {
  foo()
  console.timeEnd('1')
})
console.log('bar')
console.time('1')