// Indexable Types = 可索引的类型

interface StringArray {
  [index: number]: string;
}

let myArray: StringArray;
myArray = ["Bob", "Fred"];

let myStr: string = myArray[0];

// 这个索引代表了，当用number去索引StringArray时会得到string类型的返回值。

// TypeScript支持两种索引签名：字符串和数字, 但是数字索引的返回值必须是字符串索引返回值类型的子类型

// 这是因为当使用 number来索引时，JavaScript会将它转换成string然后再去索引对象。
// 也就是说用 100（一个number）去索引等同于使用"100"（一个string）去索引，也就是说两者返回的东西得一致，
// 否则会出现问题。

class Animal {
  name: string;
}
class Dog extends Animal {
  breed: string;
}

// 错误：使用数值型的字符串索引，有时会得到完全不同的Animal!
interface NotOkay {
  [x: number]: Animal;
  [x: string]: Dog;
}

interface ReadonlyStringArray {
  readonly [index: number]: string;
}
let myArray2: ReadonlyStringArray = ["Alice", "Bob"];
myArray2[2] = "Mallory"; // error!
myArray2['Myallory'] = 222;

// 防止对索引指向的值赋值？