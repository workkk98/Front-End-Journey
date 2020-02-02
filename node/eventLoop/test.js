console.log('start')
setTimeout(() => {
  console.log('timer1')
  Promise.resolve().then(function() {
    console.log('promise1')
  })
}, 0)
setTimeout(() => {
  console.log('timer2')
  Promise.resolve().then(function() {
    console.log('promise2')
  })
}, 0)
Promise.resolve().then(function() {
  console.log('promise3')
})
console.log('end')

// node 10.18.1版本前结果: start end promise3 timer1 timer2 promise1 promise2
// node 12版本 start end promise3 timer1 promise1 timer2 promise2
