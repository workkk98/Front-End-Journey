console.log("加载main.js 成功!")

// require.config({}) 这里可以定义 具体加载模块的路径

require(['A'], function (A) {
  console.log(A.getA())
  console.log(A.plusA())
})