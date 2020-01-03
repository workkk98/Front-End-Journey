// 1. 箭头函数没有自己的this，也就是说 this通过作用域链寻找上一级 函数作用域 或 全局作用域中的this
// 2. 箭头函数没有arguments
// 3. 不能作为构造函数 也就是不能用new(new.target)

const globalVariable = {
  a: () => {
    console.log(this)
  }
}

globalVariable.a()

// Person is not a constructor
// const Person = (name) => {
//   this.name = name
// }

// new Person()


// (() => { console.log(' ')} ()) 错误的原因
//ES6 指出 箭头函数是一种声明表达式即assignment expresstion 然后 call expresstion
// 要求左边是一个 Member Expression 或者是其他的Call Expresstion
