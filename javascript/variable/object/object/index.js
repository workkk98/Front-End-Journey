// 创建对象的方法 1. 通过构造函数 2. 通过字面量

let example = {}
// 对象属性的一些特征，这些特征实际上 不能被不能被直接访问 通过Object.definePropety() 窥探一下

Object.defineProperty(example , 'a' , {
  writable: true, // 是否可写 默认 true
  enumerable: true, // 是否可枚举 默认 true
  configurable: true, // 是否可删除 默认 true
  value: 'a' // 属性值保存的位置
})
console.log(example)
// 当然 还有get set方法,这个和Vue的数据劫持是密不可分的。

// 假如需要多个对象 ，解决办法 1. 工厂模式 2. 构造函数 3. 原型模式

function Person(name,age,job) {
  this.name = name;
  this.age = age;
  this.job = job;
  this.sayName = function () {
    console.log(this.name)
  }
}

let lilei = new Person('lilei' , 22 , 'student');
let hanmeimei = new Person('hanmeimei', 28 , 'teacher')
// false 因为new 实例的过程中 都创建了新的函数 函数名指向不同的函数
console.log(lilei.sayName == hanmeimei.sayName)

// 所以 每个实例里都创建一个函数挺没必要的（ES6里的class 方法定义在原型上） 所以使用原型prototype 

function Person2(name , age , job) {
  this.name = name;
  this.age = age;
  this.job = job;
}
Person2.prototype.sayName = function () {
  console.log(this.name)
}
// true
// Object.getPrototypeOf() 可以看出是个静态方法 返回实例的原型 也就是__proto__
console.log(Person2.prototype.constructor == Person2)
let zhouxingxing = new Person2('zhouxingxing',50,'actor')

// 原型上的属性无法修改，会创建同名属性，并屏蔽原型上的属性
// 一个检测的API 实例.hasOwnProperty()
console.log("hasOwnProperty: "+zhouxingxing.hasOwnProperty('sayName')) //false

// in操作符 不管是实例原型 都会返回true
// 如果你想要实例上所有属性，无论是否可枚举 使用Object.getOwnPropertyNames()

// 原型的动态性 实例的__proto__是个指针 指向创建实例时的构造函数的prototype
function dynamic(params) {
  
}

let dynamicObj = new dynamic()

dynamic.prototype = {
  dynamic: 'dynamic'
}

let dynamicObj2 = new dynamic()
// console.log(dynamicObj.dynamic()) //error
// console.log(dynamicObj2)