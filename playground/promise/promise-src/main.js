var _Promise = require('./src');

var p1 = new _Promise(function (resolve,reject) {
  resolve('p1');
})

p1.then(function (v) {
  console.log(v)
})

var p2 = new _Promise(function (resolve,reject) {
  setTimeout(function () {
    resolve('p2')
  },1000)
})

p2.then(function (v) {
  console.log(v)
})