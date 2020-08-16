function createArray (len: number, item: any): any[] {
  let array: any[] = []  // 数组指针
  for(let i: number = 0; i < len; i++) {
    array[i] = item
  }
  return array
}

// 如果没有泛型，我们只能设item的类型是any（因为item可能是string、number等基础数据）
// 而使用泛型，可以抽象出具体的item的类型

function createArrayTwo<T> (len: number, item: T): Array<T> {
  let array: T[] = []  // 数组指针
  for(let i: number = 0; i < len; i++) {
    array[i] = item
  }
  return array
}

createArrayTwo(5, '123')
createArrayTwo(6, 123)

// 注意函数名后加了<T> 这个T是抽象出来的，可以使用在函数的声明上，函数内部等。
// 例如这个案例item是T类型，当我们令该参数为'123'就决定了T。

function swap<T,U> (head: T, tail: U): [U,T] {
  return [tail, head]
}

// 正因为之前所说， 泛型是抽象的类型，也就是我们未知的类型，所以不能随意操作其属性。
// 通过泛型的约束，即规定泛型是某个抽象类的子类
interface arr {
  length: number
}

function getLength <T extends arr> (targ: T): number {
  return targ.length
}

// 之前在<<接口>>一节中学过，接口也可以用来表示函数变量,当然泛型也可以用于接口中

// interface CreateArrayFunc {
//   <T>(length: number, value: T): Array<T>;
// }
// let creaArr: CreateArrayFunc;
// 进阶版
interface CreateArrayFunc<T> {
  (length: number, value: T): Array<T>
}

let creaArr: CreateArrayFunc<any>;
creaArr = function<T>(length: number, value: T): Array<T> {
  let result: T[] = [];
  for (let i = 0; i < length; i++) {
      result[i] = value;
  }
  return result;
}

createArray(3, 'x'); // ['x', 'x', 'x']

interface Person {
  age: string
}
function sayAge<T extends Person> (person: T): void {
  console.log(person.age)
}