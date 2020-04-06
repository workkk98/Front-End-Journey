console.log('B')

define(function (require, exports, module) {
  module.exports = {
    moduleName: 'B.js',
    add: function (a, b) {
      return a + b;
    }
  }
})