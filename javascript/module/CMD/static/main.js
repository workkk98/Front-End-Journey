console.log('main')

define(function(require, exports, module) {
  // 同步加载 这个很厉害
  var A = require('./A');
  var B = require('./B')
  console.log('因为require是同步加载的')
  console.log(A.moduleName)
  console.log(B)
});