# vue是如何添加原生事件的

### addEventListener

前两个参数没啥可讨论的，第一个是事件，第二个是回调函数。第三个则有趣了

**useCapture** 
之前学习的DOM2，addEventListener第三个是规定事件流的触发方向。

当一个元素嵌套了另一个元素，并且两个元素都对同一事件注册了一个处理函数时，所发生的事件冒泡和事件捕获是两种不同的事件传播方式。事件传播模式决定了元素以哪个顺序接收事件。

useCapture: true(默认)采用的是事件冒泡
useCapture: false采用的是事件捕获


新版本的浏览器它是支持对象的，因为可以配置多个其他特性的参数。例如
1. once：仅调用一次
2. passive：永不会调用preventDefault函数
3. signal：AbortSignal，该 AbortSignal 的 abort() 方法被调用时，监听器会被移除
4. mozSystemGroup: 只能在 XBL 或者是 Firefox' chrome 使用，这是个 Boolean，表示 listener 被添加到 system group。（不推荐）

**passive（翻译被动的）**

passive属性的提出主要是为了改善移动端的滚动流畅性。默认值为true。

当passive为true的时候，就告诉浏览器不需要等待事件绑定函数内部不会调用preventDefault函数，来阻止默认交互行为。

刚刚也说了主要是针对滚动行为，因为浏览器通过passive属性知道了这个监听器不会阻止交互事件，所以就可以快速的渲染了（想想渲染管道）

### 参考文章

[移动Web滚动性能优化: Passive event listeners](https://segmentfault.com/a/1190000007913386)
[MDN addEventListener](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener)
[谷歌的测试:Passive touch listener scroll comparison](https://www.youtube.com/watch?v=NPM6172J22g)