#### splitChunks

我加了webpack-bundle-analyzer插件，可视化打包的内容
##### 这是webpack example1
```js
// entry.js

import('./a'); // dynamic import
```

```js
// a.js
import 'react';

//...
```

那结果就是 打包了三个入口。按照之前的理解，非动态导入的为什么也被单独打包了？
原因就是splitchunks

条件是这样的
* react 三方源于 node_modules
* react 大于 30kb
* 如果动态导入react 那么并行请求是 2个(原文是Number of parallel requests at the import call is 2)
* 不会影响初始页面的请求数 1(这个初始页面指的就是 index.html页面的请求数)

##### example2

```js
// entry.js

// dynamic imports
import(/*webpackChunkName: 'a-[hash:8]' */'./a');
import(/*webpackChunkName: 'b-[hash:8]' */'./b');

```

```js
// a.js
import '../lodash'; // helpers is 40kb in size

//...
```

```js
// b.js
import '../lodash'; // helpers is 40kb in size 我用lodash来替代helpers
import '../underscore'; // more-helpers is also 40kb in size 
//...
```

结果是a和b 共同引用的 lodash被打入一个分离包中，b引用的underscore未被分离

原因:
1. lodash在两个动态引用中 都用到了
2. lodash大于 30kb
3. 入口文件的 并行请求是2
4. 初始页面的 并行请求是1 (Doesn't affect request at initial page load)


##### 分析各个配置项

[splitChunks.chunks](https://webpack.js.org/plugins/split-chunks-plugin/#splitchunkschunks)

这个值有'async', 'inital', 'all' 意思对哪些chunks应用这个分离代码策略
例如默认值是 async 就代表了

对动态导入的文件采取分离代码策略。