# class类和寄生组合的区别

// 具体打开 ./index.html文件

```js
// class声明
BMW {type: "tourism car", name: "330"}
type: "tourism car"
name: "330"
__proto__: Car
constructor: class BMW
sayName: ƒ sayName()
__proto__:
constructor: class Car
sayType: ƒ sayType()
__proto__: Object

// 寄生组合声明
BMW2 {type: "tourism car", name: "330"}
type: "tourism car"
name: "330"
__proto__: Car2
constructor: ƒ BMW2(name)
sayName: ƒ ()
__proto__:
sayType: ƒ ()
constructor: ƒ Car2(type)
__proto__: Object

```

从例子中，我们可以看到其实新创建两个实例非常相似。也就是说ES6和寄生组合的继承方式是类似的
1. 都是把构造函数里的声明属性放在对象本身
2. 把原型上的内容通过__proto__链区分

区别在于

也就是ES5之前是子类先生成实例，而ES6相反
> ES5 的继承，实质是先创造子类的实例对象this，然后再将父类的方法添加到this上面（Parent.apply(this)）。ES6 的继承机制完全不同，实质是先将父类实例对象的属性和方法，加到this上面（所以必须先调用super方法），然后再用子类的构造函数修改this。

这点可以通过babel转义后的class文件进行佐证,详细内容看 /lib/class.js文件

```js
var BMW = /*#__PURE__*/function (_Car) {
  _inherits(BMW, _Car);

  var _super = _createSuper(BMW);

  function BMW(name) {
    var _this;

    _classCallCheck(this, BMW);

    _this = _super.call(this, 'tourism car'); // 先调用_super 即 父类构造函数

    _this.name = name;
    return _this;
  }

  _createClass(BMW, [{
    key: "sayName",
    value: function sayName() {
      console.log(this.name);
    }
  }]);

  return BMW;
}(Car);
```