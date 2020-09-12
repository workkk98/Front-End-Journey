var myObj = {
  bar: 'bar'
}

console.log(Reflect.has(myObj, 'bar'))

Reflect.deleteProperty(myObj, 'bar')

console.log(myObj)

function car (name, belong) {
  this.name = name;
  this.belong = belong;
}

let _330 = Reflect.construct(car, ['BMW', 'zhf'])
console.log(_330)

// 报错，但Object.getPrototypeOf()不会，因为它会隐式转换
try {
  Reflect.getPrototypeOf(22)
} catch (e) {
  console.log(e)
}