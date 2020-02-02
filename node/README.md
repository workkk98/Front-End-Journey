# Node.js

#### 非阻塞I/O 及事件循环机制

1. 非阻塞I/O机制

遇到类似于读写数据库的操作时，立即转而执行其后面的代码，并在数据库返回结果处理的代码放在回调函数中执行。

适用场景：当应用程序需要大量并发量的输入/输出，而在向客户端发出响应之前，应用程序内部并不需要进行非常复杂的处理的过程的时候。

核心模块列表(记录我觉得重要的 还有很多实际上):
* buffer 用于二进制的数据的存储和转换
* cluster 用于实现多进程
* console  控制台输出文本
* fs 操作文件
* http 用于实现http服务器及客户端
* events 事件类

追加类、函数与对象:
Buffer
setTimeout/clearTimeout 设置定时器
setInterval/clearInterVal 用于设置一个时间间隔的回调函数
require
module(对象) 模块信息
process(对象) 进程对象

#### require 我认为这个函数还是十分重要的
具体code在commonJS文件夹下
先不谈它和ES6的区别

**require()**
require()用来加载文件 参数是完整的路径名例如'./file.js' 或是 模块名称例如path

具体看/commonJS/app.js

* 命令行直接运行js模块 ， module === require.main 即本模块是 主模块
* 加载模块时 会运行每一行模块代码 其实 我是理解成模块是包裹在IIFE中的函数就好了

**require.resolve()**

返回模块的绝对路径

**require.cache**

cache是个缓存对象，表示已被加载模块的缓存区

**__filename , __dirname**

模块内变量 绝对路径  ， 模块所在文件夹绝对路径

#### 事件处理机制和事件循环机制

V8 <=> Node.js bindings(Node API) <=> Libuv (library Unicorn Velociraptor 独角伶盗龙)

**Libuv的六个阶段**
```
  timers
  I/O callbacks
  idle, prepare
  poll          <---------- incoming : connections , data ,etc
  check
  close callbacks
```

假设 node进程正在运行http模块那么当请求发送到服务端时
整个过程就是 从 外部输入数据 => 轮询阶段(poll) => 检查阶段(check) => 关闭事件回调阶段(close callbacks) =>
定时器检测阶段(timers) => I/O事件回调阶段(I/O callbacks) => 闲置阶段(idle , prepare) => 轮询阶段(poll) =>
继续按照顺序执行
**每个阶段都有自己的回调队列,当回调队列为空或者执行的回调数数量达到系统设定的阈值，就会进入下一阶段**


#### Buffer全局构造函数

没怎么仔细阅读，以后得看

#### 

