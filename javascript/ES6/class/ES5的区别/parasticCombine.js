function Car2 (type) {
  this.type = type
}

Car2.prototype.sayType = function () {
  console.log(this.type)
}

function BMW2 (name) {
  Car2.call(this,'tourism car');
  this.name = name;
}

BMW2.prototype.sayName = function () {
  console.log(this.name)
}

function parastic (Father, Son) {
  // 这一步是原型式
  var copy = Object.create(Father.prototype); // Object.create(target, propertyObject)
  // 那寄生就是 原型式的基础上 对对象进行增强属性
  Object.assign(copy, Son.prototype);
  copy.constructor = Son;
  Son.prototype = copy
}

parastic(Car2, BMW2)

console.log("寄生组合", new BMW2('330'))
