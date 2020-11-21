let a = {
  a:undefined
}

// 假设有个属性设为undefined 那怎么区分它和 未声明的属性

// 1. prototype.hasOwnProperty()
console.log(a.hasOwnProperty('a'))
console.log(a.hasOwnProperty('b')) // false

// 2. in运算符 检测属性是否存在
console.log('a' in a)
try {
  console.log('b' in b)
} catch(err) {
  console.error('try-catch', err)
}

// 3. propertyIsEnumerable() 第一种的增强版本
console.log(a.propertyIsEnumerable('a')) // true
console.log(a.propertyIsEnumerable('b')) // false