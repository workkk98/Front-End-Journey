# XDM

一定要注意iframe和主文档的加载顺序。具体看代码

```
window.onload = function () {
  var iframeWindow = document.querySelector('#myframe').contentWindow
  iframeWindow.postMessage('tell you a story' , 'http://localhost:1818')
}
```

我之前没这么做，导致了iframe始终无法接收到消息，说明 index的script执行时，iframe的script未执行完毕。
再整理下，其实iframe是src外链 类似于图片这样子。


事实上，我实验的时候
父window: iframeWindow.postMessage('' , 'http://localhost:1818') (子window)
子window: event.source.postMessage('I have recived' , 'http://iframe.localhost:1818') 控制台会显示错误
这个子域名都会有问题。