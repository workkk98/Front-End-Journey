// question: 假设对象上和原型有同样的属性，如何去获取原型上的属性

// 我想到的第一种 通过用 delete 删除原对象上的属性

var a = {
  a:  'a'
}
a.__proto__ = { a: 'proto-a'};

delete a.a
console.log("1", a.a)

// 第二种 用个对象继承a的原型

var b = {};
b.__proto__ = a.__proto__;
console.log("2", b.a)


// 第三种 围绕不开proto 那我们不如直接拿到 proto
console.log("3", Object.getPrototypeOf(a).a)