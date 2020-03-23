// 函数绑定
// 创建一个函数，可以在特定的this环境中以指定参数调用另一个函数

function bind (fn,context,...args) {
  return function () {
    return fn.apply(context,args)
  }
}

var a = 1, b = 1;

function sum() {
  return this.a+this.b
}

var obj = {
  a:2,
  b:2
}

var sumBind = bind(sum , obj)

console.log(sumBind())