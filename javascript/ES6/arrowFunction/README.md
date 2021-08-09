# Arrow Functions

也是从coffeescript中借鉴过来的。

### 箭头函数是为了解决函数表达式几个常见的痛点

- Lexical `this` binding;

  this词法上的绑定

- Shorter syntactical form (`() => {}` vs. `function () {}`)更短的语法



### 提案

```javascript
const obj = {
  method: function () {
    return () => this;
  }
};

assert(obj.method()() === obj);
```



### details

Arrow functions bind `this` lexically, bind `return` in the *Block* body case so it returns from the immediately enclosing arrow function, and preclude `break` and `continue` from referencing statements outside the immediately enclosing arrow function.



arguments属性不能用于箭头函数内。相同的，yield也不行

箭头函数就像一个内置（built-in）函数一样，缺少.prototype和any [[Construct]]内部方法。所以通过new  `new (() => {})` 会扔出一个类型错误。其他就像函数一样（类型是函数，函数的原型指向Function.prototype)

因为是this是词法绑定，所以call和apply方法`this`参数没用，但其他参数实施有效的。



### 参考链接

[arrow-functions](http://tc39wiki.calculist.org/es6/arrow-functions/)