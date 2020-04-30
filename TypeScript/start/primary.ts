// 基础类型 同JS相同 null undefined string number boolean Symbol

let isDone: boolean = true

let age: number = 22

let myName: string = 'zhang'

let n: null = null

let m: undefined = undefined

// null undefined 是所有类型的子类

let notAnum: number = undefined

// let myHomelocation = 'hangzhou'

// myHomelocation = 88


// 联合类型

let myFavoriteNumber: string | number = 'seven'


// 只能访问共同的属性和方法
// function getLength(something: string | number): number {
//   return something.length;
// }
