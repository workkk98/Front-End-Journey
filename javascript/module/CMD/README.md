# CMD

之前学习了AMD,  实际上 CMD是 common.js 和 AMD规范的集大成者。那实现了CMD这个规范的有sea.js这个库

哇哦，在翻阅资料的时候。发现sea.js 这个库是由阿里支付宝前端玉伯设计的。这里题一笔是因为，想知道

我自己和大牛的差距，当然也是个谈资。

#### sea.js

因为我主要还是在浏览器环境下使用嘛。所以直接在html中引用了seajs中的打包文件(当然这也能在node环境下使用)


区别于AMD使用data-main属性来加载主模块

CMD手动配置，需要加载的路径和主模块
```html
  <script src="./sea-debug.js"></script>
  <script>
    seajs.config({
      base:'./'
    })
    seajs.use("./static/main.js")
  </script>
```

另外，函数参数中提供三个变量分别是 require, exports, module

这三个很明显就像是common.js中的函数或对象

```js
define(function(require, exports, module) {
  // 同步加载 这个很厉害
  var A = require('./A');
  var B = require('./B')
  console.log(A.moduleName)
});
```

require()函数是同步加载的, 然而 require.async()函数是异步加载的

```js
  require.async('./module3', function (m3) {
    console.log('异步引入依赖模块3  ' + m3.API_KEY)
  })
```

