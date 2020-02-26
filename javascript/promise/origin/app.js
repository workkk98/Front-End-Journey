var promise = require('promise');

var p1 = new Promise(function (resolve,reject) {
  resolve()
})
var p2 = p1.then(function (value) {
  return new Promise(function (resolve) {
    setTimeout(resolve, 10000)
  })
})

console.log(Object.keys(p1))