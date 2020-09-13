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

### 重写父类的方法 example2.ts

在类的方法里，我们可以调用super对象来获取父类里的方法。

实际的原理就是```super.move === super.prototype.move```


### 理解private private.ts

> typeScript使用的是结构性类型系统。 当我们比较两种不同的类型时，并不在乎它们从何处而来，如果所有成员的类型都是兼容的，我们就认为它们的类型是兼容的。

> 然而，当我们比较带有 private或 protected成员的类型的时候，情况就不同了。 如果其中一个类型里包含一个 private成员，那么只有当另外一个类型中也存在这样一个 private成员， **并且它们都是来自同一处声明时**，我们才认为这两个类型是兼容的。 对于 protected成员也使用这个规则。

官方文档想说明的是，尽管ts是结构类型系统的，但假如两个不同类的实例结构相同，但变量是private声明的，这就说明他们是不同的。

就如同private.ts里的例子，虽然```employee = animal ```虽然这两个变量结构相同，但因为私有变量修饰符，他们必须有同一个类声明，才能认为他们是相同的。

### protected

受保护类型的含义就是该变量或函数只能被类里的函数或派生类访问。

### readOnly

> 你可以使用 readonly关键字将属性设置为只读的。 只读属性必须在声明时或构造函数里被初始化。

只能在构造函数或声明时初始化，那我觉得之前在项目里写的vue-prop属性应该把readonly给去掉。

### 静态属性

静态属性就是构造函数对象上的属性。

### 抽象类

抽象类在编译成js文件后，和其他的类并没有什么区别。

> 抽象类做为其它派生类的基类使用。 它们一般不会直接被实例化。 不同于接口，抽象类可以包含成员的实现细节。 abstract关键字是用于****定义抽象类**和在抽象类内部定义**抽象方法**。

> 抽象类中的抽象方法不包含具体实现并且必须在派生类中实现。 抽象方法的语法与接口方法相似。 两者都是定义方法签名但不包含方法体。 然而，抽象方法必须包含 abstract关键字并且可以包含访问修饰符

### 高级技巧

声明一个类的过程后，通过 new 可以获得实例，也获得了一个构造函数。那构造函数及相关的静态属性，我们该怎么声明这个类型呢？

```ts
let OtherCar: typeof Car = Car;
```

