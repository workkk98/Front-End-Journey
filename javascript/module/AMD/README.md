# AMD

[阮一峰: Javascript模块化编程（三）：require.js的用法](http://www.ruanyifeng.com/blog/2012/11/require_js.html)
> AMD是"Asynchronous Module Definition"的缩写，意思就是"异步模块定义"。它采用异步方式加载模块，模块的加载不影响它后面语句的运行。所有依赖这个模块的语句，都定义在一个回调函数中，等到加载完成之后，这个回调函数才会运行。

```js
require([module], callback)
```

因为AMD异步加载模块，对比common.js 中的require函数同步加载。

浏览器端肯定是喜欢异步的，因为如果是同步加载模块，会导致线程一直堵塞，所以AMD更适合客户端。


#### 使用

详细可以看index.html

1. 引入require.js, 并下载主模块
```html
<script src="./require.js" data-main="./js/main"></script>
```
这一步先引入require.js, 再执行该模块时，通过data-main属性加载模块

2. main.js中调用require.js中的require方法。

```js
require(['A', 'B'], function (A, B) {
  console.log('callback')
})
```
异步下载同目录下的模块，依次下载完后调用callback

3. A.js中

在A模块中，使用define函数去导出类(当然也支持去加载其他模块)

```js
define(function () {
  return {
    A:'a'
  }
})
```

#### 总结

1. 使用异步加载模块，有规范化导出和导入的函数(所以适合浏览器)
2. 倒入模块执行过程中，也应当是使用了IIFE, 避免了变量污染
3. 分为主模块和子模块，然后里面调用的方法不同一个是require,一个是define。抽象起来有点像树的结构