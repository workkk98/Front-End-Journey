setTimeout(function () {
  console.log('setTimeout1')
  Promise.resolve().then(function () {
    console.log('promise1')
  })
  process.nextTick(function () {
    console.log('process.nextTick1')
  })
},0)

setTimeout(function () {
  console.log('setTimeout2')
  Promise.resolve().then(function () {
    console.log('promise2')
  })
  process.nextTick(function () {
    console.log('process.nextTick2')
  })
},0)

// 如果使用 node v10.18.1 你可以看到这样的结果
// setTimeout1 setTimeout2 process.nextTick1 process.nextTick2 promise1 promise2
// node v12.13.1
// setTimeout1 process.nextTick1 promise1 setTimeout2 process.nextTick2 promise2