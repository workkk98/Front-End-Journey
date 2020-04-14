# 20年4月周记 3

#### splitChunks

关于splitChunks插件的小段代码
```js
 optimization: {
   splitChunks: {
     chunks: 'async', // 默认async, 其他还有 inital, all
     cacheGroups: {
       vendors: {
         test: /\/node_modules\//,
         priority: 10,
         chunks: 'all'
       }
     }
   }
 }
```

那我们知道 splitChunks就是一个分离策略，应用于我们的模块。

先来看下chunks的意思，chunks是指哪些模块会应用这个分离策略。例如'async', 就指明了

动态导入的模块，采用这个分离策略。

那这个分离策略默认有以下条件
1. 我称为使用频率，例如来自node_modules或是动态导入的模块共享了这个模块
2. 模块大小 >=30kb
3. 入口模块的并行请求 小于5
4. 初始页面的并行请求 小于3(这个初始页面指的就是 index.html加载时，会有多少个请求)

这些属性都是可覆盖的具体可以看 官网链接[splitChunks](https://webpack.js.org/plugins/split-chunks-plugin/#splitchunkscachegroups)

**cacheGroups**

稍微提一笔cacheGroups, 因为通过这个属性，我们可以分门别类的自由打包模块。

例如把 vue类, axios类的打包在一起

#### 翻转链表2

问题: 链表第n个节点和第m个节点翻转。

那说下我看到不同的思路。因为是把链表的部分逆转.

原先是这样 n -> n+1 -> n+2 -> n+3 -> ... -> m

那我的想法是 n <- n+1 <- ... <- m 这样一步步去逆转原先的部分即可，然后首尾连接到相应的位置

但是别人的想法 很巧妙， 把n+1移到n节点前，然后再把n+2节点移到n+1节点前。

#### CORS cookie问题

昨天找了很久吧。实际上问题就出在了 Access-Control-Allow-Origin这个字段 和请求Origin字段不统一导致的。

因为携带cookie访问 必须这两个字段值相同

加上chrome移除了 options请求。以至于我更难去判断了。这也提醒我 得去抓包了