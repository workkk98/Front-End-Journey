# FSL(Force Synchronous Layout) - 强制同步布局

我们都知道浏览器渲染管线（道）。
JS -> style -> layout -> Paint -> Composite。

但由于一些js操作，可能会导致浏览器强制先计算布局，这被称为强制同步布局。

### 实验

具体可以通过./index.html文件来测试。
就这个例子来说，如果点击trigger1按钮，因为更新第二个按钮时，需要重新计算butt1的宽度，所以force-layout.png里又出现了一次layout，重新计算布局。

那按照这个思路，我们避免更新完butt1后再次读取butt1的宽度即可。例如force-layout2.png。

### 疑惑的点

1. 为什么第一个例子中update width一共触发了4次？

### 参考链接

[force synchronous layout](https://segmentfault.com/a/1190000008608510)

