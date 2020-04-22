# 2020年4月 周4

#### 原生实现文件上传

前端通过input flie元素, 获取元素后监听change事件

change事件 和 input的区别， 前者必须修改原先值，后者则是有输入就会触发。

HTML5提供了元素的files接口，这个接口是FileList类的实例。原型有symbol.iteerator接口

接口中有着file对象，获取到对象后

1. 实例化一个new FormData()对象   form
2. form.append(name, value) value就是这个file对象即可

最后通过ajax上传form。但要注意的是 这个文件上传的类型是 Content-Type: mutipart/form-data

后端方面

通过监听流，写入文件然后移动文件到对应文件夹即可。

#### js对象属性的顺序问题

*好文*
[对象属性顺序](https://juejin.im/post/5c88ce0e5188257f882f0ef8)
[内部顺序](https://www.stefanjudis.com/today-i-learned/property-order-is-predictable-in-javascript-objects-since-es2015/)

```js
var a = {
  '0.1': '0.1',
  a: 'a',
  b: 'b',
  1: 1
}

Object.keys(a) // ["1", "0.1", "a", "b"]
```

结果说明，最后打印的顺序与声明先后的顺序并没有关系。

**另外Object.keys[] 和 for in的输出顺序相同。这个顺序是基于浏览器的实现**

> Object.keys() returns an array whose elements are strings corresponding to the enumerable properties found directly upon object. The ordering of the properties is the same as that given by looping over the properties of the object manually.



我从文章得知，JavaScript内部有一个ownPropertyKeys方法，它定义了对象属性遍历的顺序。
而Object.getOwnPropertyNames()这个静态方法基于这个ownPropertyKeys方法。保证了遍历的顺序。

> 1. integer-like keys in ascending order
  2. normal keys in insertion order
  3. Symbols in insertion order
  4. if mixed, order: interger-like, normal keys, Symbols

* 数字类型的升序
* 正常类型的键名根据添加的顺序，例如 a: 'a'这样子的 符合命名规范的
* symbol类型的根据添加的顺序
* 如果是混合的，按照这个顺序: 像数字的，像普通键名的，像symbols类型的 **这个指得是，对象内有这三种类型的属性的话**

```js
a = {
  '0.1': '0.1',
  b: 'b',
  a: 'a',
  1: 1,
  [Symbol('a')]: Symbol('a'),
  '01': '01',
  '01ab': '01ab'  
}
// 0.1: "0.1"
// 01: "01"
// 01ab: "01ab"
// 1: 1
// a: "a"
// b: "b"
// Symbol(a): Symbol(a)
```

值得一提的是，像'01', '01ab'这些键名 属于interger-like类型

所以比较对象，不能通过使用类似Object.keys()的方法。主要因为你不能保证对象的属性的添加顺序。
而且遍历基于什么标准你也不能保证

```js
a = {a:'a', b: 'b'}
b = {b: 'b', a: 'a'}

Object.keys(a)
// ["a", "b"]
Object.keys(b)
//["b", "a"]
```

这个对象a 和 b从实际意义上明显是相等的， 但是a和b对象key输出顺序由于添加顺序的不同而不同.

