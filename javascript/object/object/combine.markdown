# 继承（原型搜索机制）

**这些具体实现可以在ways目录中**

## 1.原型链继承

```
  // 通过函数的prototype, 注意一点就是原型的动态性, 所以要修改prototype的指向时得注意
  Person.prototype = {}
```

缺点: 原型的引用类型共用

## 2.借用构造函数(constructor stealing)
> 原理在 **子类型结构函数** 的内部调用 **超类型构造函数**

```
function SuperType() {
  this.colors = ["red","blue","green"]
}

function SubType() {
  SuperType.call(this)
}

```

缺点： 函数无法共用，因为每次生成新实例都创建新的函数。

## 3.组合继承(combination inheritance)
> 将原型链和借用构造函数的技术组合到一块

```
function SuperType(name) {
  this.names = name;
  this.colors = ['black','pink'];
}

SuperType.prototype.sayName = function () {
  console.log(this.name)
}

function SubType(name,age) {
  SuperType.call(this,name);

  this.age = age
}

SubType.prototype = new SuperType();
SubType.prototype.constructor = SubType

var instance1 = new SubType("Nicholas", 29)

```

缺点：在 子构造函数里调用了一次父构造函数，原型上又用到一次父构造函数，对象里和原型上有重复的属性

## 原型式继承

> 借助原型可以基于已有的对象创建新对象

```
function object(o) {
  function f() {}
  f.prototype = o
  return new f()
}
```

ES5中直接用Object.create(arg1,arg2)这个API来规范化了原型式继承，arg1作为原型继承，arg2新对象额外属性的对象

## 寄生式继承
与原型式紧密相关的一种思路
> 寄生式继承的思路与寄生构造函数和工厂模式（创建对象，增强对象）类似，即创建一个仅用于封装继承过程的函数，该函数在内部以某种方式来增强对象，最后再像真的是他做了所有工作一样返回对象

```
function createAnother(original) {
  var clone = object(original); //原型式中的object函数
  clone.sayHi = function () {
    console.log('hi)
  }
  return clone
}
```

缺点： 函数不能复用

## 寄生组合式（寄生+组合式）

```
function inheritPrototype() {
  var prototype = object(superType.prototype)
  prototype.constructor = subType;
  // 上两步就是创建对象，增强对象
  subType.prototype = prototype
}

//剩下就是组合的方法
```