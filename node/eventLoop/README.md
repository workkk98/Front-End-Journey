# Event_Loop

#### poll阶段
在最关键的poll阶段
获取新的I/O事件 ， 适当的时候会在这里堵塞(这点真是解决了 我的一个疑问 就是为什么server.listen()后的情况)

先不考虑timers阶段对其产生的影响

如果事件循环进入poll阶段,有下面两种情况

1. 如果poll队列不为空 事件循环将**遍历同步**执行它们的回调函数

2. poll为空 又分两种情况

  * 假如有预设的setImmediate(callback)回调队列,进入下一'check'阶段(按照事件循环，进行下去)
  * 没有预设的setImmediate(callback)回调队列,阻塞在poll阶段等待

一旦poll队列为空，事件循环会检查timers阶段里的队列是否为空，如果任务队列里非空，那么跳到timers阶段执行下一轮事件循环。

[Node.js 事件循环，定时器和 process.nextTick()](https://github.com/nodejs/nodejs.org/blob/master/locale/zh-cn/docs/guides/event-loop-timers-and-nexttick.md)
[Node.js事件循环 by 童欧巴](https://juejin.im/post/5de095dd6fb9a071b5615db2#heading-6)

[事件循环 源码](https://github.com/libuv/libuv/blob/v1.x/src/unix/core.c)
[node11 PR](https://github.com/nodejs/node/pull/22842#discussion_r218142520)