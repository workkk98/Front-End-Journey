# class

### extends， 类继承和寄生组合继承完全一样吗？

class继承和寄生组合继承基本上没有区别
除了class首先得调用supre函数，才能拿到this对象这是为什么呢？

```js
var Dog = /** @class */ (function (_super) {
    __extends(Dog, _super);
    function Dog() {
        var _this = _super.call(this) || this;
        _this.type = 'husky';
        return _this;
    }
    Dog.prototype.bark = function () {
        console.log('Woof! Woof!');
    };
    return Dog;
}(Animal));
```

这里很明显的是，原来Dog函数返回了Animal函数构造的对象，当开发者不调用super()函数，就意味着this这个对象不存在。

> 因为new操作符中，如果函数有返回值，优先返回函数的返回值, 可这有个疑问了，那这个返回的对象的原型是怎么实现的？

秘密在这段代码中：
```js
var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf || 
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) || 
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};


return function (d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
```

1. extendStatics函数中，判断了当前的环境是否支持某个方法，依次是```Object.setPrototypeOf()```, ```d.__proto__ = b```, 总之这一步的方法**是把函数d的原型__proto__(而不是prototyoe)指向函数b**, 所以这个函数叫extendStatics。

2. 创建了个name是```__```函数

3. d函数的原型指向new __(),这个步骤就是寄生过程了。


再往下看：

```js
    function Dog() {
        var _this = _super.call(this) || this;
        _this.type = 'husky';
        debugger;
        return _this;
    }
```

之前漏了一个细节，这里的this是已被js底层装饰过的，它是个对象，且__proto__指向函数的prototype。再经过两个函数的调用，就获得了最终的dog实例。完全就是**寄生组合继承**，但区别就是得先调用super函数，否则你拿不到this，从这里也可以看到了。

如果不调用super函数，经过编译，dog函数就变成这样了。也就是父类没被调用，父类的属性没了。

```js
function Dog () {
    var _this = this;
    _this.type = 'husky';
    return _this;
}
```
