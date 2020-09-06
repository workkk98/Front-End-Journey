# 拖放

[张鑫旭](https://www.zhangxinxu.com/wordpress/2018/09/drag-drop-datatransfer-js/)

### 可被拖动的元素

本身具有可拖动属性的元素有文本，图像等，其他元素HTML5也赋予了这个能力，得声明dragable属性

被拖动的元素
* dragstart
* drag
* dragend

**放置目标的元素（放置区域）**
* dragenter
* dragover
* dragleave 或 drop

拖动元素一直在放置元素区域内拖动时，会触发dragover事件，类似于鼠标移动的mouseover，然后拖动元素最后可能是离开里这个元素，也可能被放置到当前元素中，所以对应的有两个事件dragleave 和 drop，drop的意思就是说丢弃到当前的元素中。

> drop事件只有在dragover阻止其默认行为的情况下，才能被触发。

为什么drop事件这么重要，因为用户只能通过drop事件，才能从datatransfer对象中拿到所需要的数据。

### dataTransfer对象

**setData**

setData(type, data)

**getData**

getData(type)
这个函数只能在drop事件的过程中读取。

**files**

文件列表