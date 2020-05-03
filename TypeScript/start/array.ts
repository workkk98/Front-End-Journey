// 数组类型

// 第一种 类型+方括号
let fibonacci: number[] = [1, 1, 2, 3, 5]

// 第二种 数组泛型 Array<elementType>
let familyAges: Array<number> = [70, 68, 44, 22]

// 第三种 接口 主要用来描述类数组对象 例如arguments
interface args {
  [index: number]: number
  length: number
  callee: Function
}

// 这个index属性很奇怪，1. 不是任意属性 2. index名称代表啥意义？

function add (a, b) {
  let arg: args = arguments
  console.log(arguments)
  return arg[0]+ arg[1]
}

add(1,'aaa')