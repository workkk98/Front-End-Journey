# module

### commonjs和es6module的区别

```js
// es6
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "foo1", function() { return foo1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bar1", function() { return bar1; });
const foo1 = 'basic value';
const bar1 = {
  name: 'es6module'
};
```
从源码中我们可以看到，ES6module，暴露出去的实际上是一个‘指针’，这个‘指针’永远指向foo1变量，当foo1变量变更时，再次获取这个变量。

```js
// commonjs
var foo = 'basic value';
exports.foo = foo;
exports.bar = {
  name: 'commonjs'
};
```
然而在commonjs这边，foo是个基础值，等到foo改变后，在获取foo，foo仍然是'basic value';

总结，es6module暴露的变量都是指针，指向文件内部的变量。而commonjs这边则是都是浅拷贝的值。