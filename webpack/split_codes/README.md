# 代码分离

#### 入口起点(entry points)

通过增加entry，相当于多一个入口，非常直观。

缺点是
* 假如两个入口有重复模块，那些重复模块都会被引入到各个 bundle 中
* 这种方法不够灵活，并且不能将核心应用程序逻辑进行动态拆分代码。

#### 防止重复SplitChunksPlugin(事实上之前叫 CommonsChunkPlugin)
解决了入口模块 重复的问题

> 可以将公共的依赖模块提取到已有的入口 chunk 中，或者提取到一个新生成的 chunk。

```
module.exports = {
  //...
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 30000,
      minRemainingSize: 0, // was introduced in webpack 5
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 6,
      maxInitialRequests: 4,
      automaticNameDelimiter: '~',
      automaticNameMaxLength: 30,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  }
};
```

**splitChunks.chunks**

> This indicates which chunks will be selected for optimization. When a string is provided, valid values are all, async, and initial. Providing all can be particularly powerful, because it means that chunks can be shared even between async and non-async chunks.

我来翻译下，就是说这个字段暗示哪些chunks会选择被优化。合法的值是
'all' , 'async', 'initial' 以及 function
```
  chunks (chunk) {
    // exclude `my-excluded-chunk`
    return chunk.name !== 'my-excluded-chunk';
  }
```

**splitChunks.cacheGroups**

> Cache groups can inherit and/or override any options from splitChunks.*; but test, priority and reuseExistingChunk can only be configured on cache group level. To disable any of the default cache groups, set them to false.


#### 动态导入

实际上 vue-router的路由懒加载 也是依靠这个方法

> 当涉及到动态代码拆分时，webpack 提供了两个类似的技术。对于动态导入，第一种，也是优先选择的方式是，使用符合 ECMAScript 提案 的 import() 语法。第二种，则是使用 webpack 特定的 require.ensure。让我们先尝试使用第一种……

> $ npm run dev也就是开发模式下

可以在chrome浏览器network中看到，有条get请求被触发了

实际上是webpack 把 import语法转化成了别的,具体可以搜索 chrome开发模式中Sources
```
// import语法转换成了__webpack_require__.e
__webpack_require__.e(/*! import() | lodash */ \"vendors~lodash\")

// 详细看下 这个__webpack_require__.e函数
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// JSONP chunk loading for javascript
/******/
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData !== 0) { // 0 means "already installed".
/******/
/******/ 			// a Promise means "currently loading".
/******/ 			if(installedChunkData) {
/******/ 				promises.push(installedChunkData[2]);
/******/ 			} else {
/******/ 				// setup Promise in chunk cache
/******/ 				var promise = new Promise(function(resolve, reject) {
/******/ 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 				});
/******/ 				promises.push(installedChunkData[2] = promise);
/******/
/******/ 				// start chunk loading
/******/ 				var script = document.createElement('script');
/******/ 				var onScriptComplete;
/******/
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.src = jsonpScriptSrc(chunkId);
/******/
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				onScriptComplete = function (event) {
/******/ 					// avoid mem leaks in IE.
/******/ 					script.onerror = script.onload = null;
/******/ 					clearTimeout(timeout);
/******/ 					var chunk = installedChunks[chunkId];
/******/ 					if(chunk !== 0) {
/******/ 						if(chunk) {
/******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 							var realSrc = event && event.target && event.target.src;
/******/ 							error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 							error.name = 'ChunkLoadError';
/******/ 							error.type = errorType;
/******/ 							error.request = realSrc;
/******/ 							chunk[1](error);
/******/ 						}
/******/ 						installedChunks[chunkId] = undefined;
/******/ 					}
/******/ 				};
/******/ 				var timeout = setTimeout(function(){
/******/ 					onScriptComplete({ type: 'timeout', target: script });
/******/ 				}, 120000);
/******/ 				script.onerror = script.onload = onScriptComplete;
/******/ 				document.head.appendChild(script);
/******/ 			}
/******/ 		}
/******/ 		return Promise.all(promises);
/******/ 	};
```


实质上就是使用了 script.src + promise来异步获取一个分离的脚本