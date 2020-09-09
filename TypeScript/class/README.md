# class

### extends

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

> 因为new操作符中，如果函数有返回值，优先返回函数的返回值。