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

追加类、函数与对象:
Buffer
setTimeout/clearTimeout 设置定时器
setInterval/clearInterVal 用于设置一个时间间隔的回调函数
require
module(对象) 模块信息
process(对象) 进程对象


#### REPL(Read-Eval-Print-Loop)


