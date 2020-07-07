// 数组类型

// 第一种 类型+方括号
let fibonacci: number[] = [1, 1, 2, 3, 5]
let highArray: number[] = [183, 175, 179]

// 第二种 数组泛型 Array<elementType>
let familyAges: Array<number> = [70, 68, 44, 22]
let familyNames: Array<string> = ['zzz', 'wye', 'zfd', 'zhf']

// 第三种 接口 主要用来描述类数组对象 例如arguments
interface args {
  [index: number]: string
  length: number
  callee: Function
  // 0: 0
}
// interface person {
//   [propName: string]: string,
//   0: 0,
//   name: 2333
// }

// 这个index属性很奇怪，1. 不是任意属性 2. index名称代表啥意义？
// 通过对试验，我发现[index: number] 这个是任意属性，键名是什么都可以，例如index,propName
// 但关键的是，键名的属性，键名属性是字符串的 键值属性 都得是该任意属性键值的子属性。
// 例如index规定了数值类型的键名对应的键值都为字符串

function add (a, b) {
  let arg: args = arguments
  console.log(arguments)
  return arg[0]+ arg[1]
}

add(1,'aaa')