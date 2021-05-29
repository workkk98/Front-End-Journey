# 柯里化函数

> In mathematics and computer science, currying is the technique of translating the evaluation of a function that takes multiple arguments (or a tuple of arguments) into evaluating a sequence of functions, each with a single argument.

简而言之就是将拥有多个参数的函数，转换成一个系列的函数，每个函数只有一个参数。

### curry化返回函数的特性

1. 参数不同时要返回不同的函数。
2. 参数长度满足原函数的长度时，调用原函数。

### 实现原理

我们很容易联想到，这样的函数需要用过函数作用域链来保留历史的参数，以及被柯里化的函数。
最简单的版本可以如下。

```js
function curry (fn) {
  let args = [];
  return function curriedFn (...args2) {
    args = args.concat(args2);
    if (args.length < fn.length) {
      return curriedFn;
    } else {
      return fn(...args)
    }
  }
}
```
