function ques (i) {
  console.log(i) // 10
  console.log(arguments[0]) // 10
  var i = 2
  console.log(i) // 2
  console.log(arguments[0]) // 2
}

ques(10)

// 说明 形参 定义了某个变量i  var带来的变量提升可以忽略了。(可以这么理解，在构造函数的上下文环境时 已然声明了i  所以var无效)

// 在非严格模式下 且 形参存在, 修改形参 等同于 修改实参类数组对象中的 对应参数，反之亦然
// 严格模式下 不行

function ques2 (i) {
  'use strict'
  console.log(i) // 10
  console.log(arguments[0]) // 10
  var i = 2
  console.log(i) // 2
  console.log(arguments[0]) // 10
}
ques2(10)