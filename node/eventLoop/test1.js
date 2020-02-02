setTimeout(function () {
  console.log('setTimeout')
},0)

setImmediate(function () {
  console.log('setImmediate')
})

process.nextTick(function () {
  console.log('process.nextTick')
})