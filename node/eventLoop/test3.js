const fs = require('fs')

fs.readFile('./README.md' , function (err , data) {
  setTimeout(function () {
    console.log('setTimeout')
  },0);
  setImmediate(function () {
    console.log('immediate')
  })
})