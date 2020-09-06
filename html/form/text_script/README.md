# 文本框脚本

这个章节虽然属于form表单这一块，但还是单拿出来写个readme比较好。

### input和textarea的异同点

相同点：
1. value即文本值


不同点：
1. 初始化value，是通过元素内插值```<textarea>init value</textarea>
2. 输入框的大小，input是size，textarea是clos
3. input可以控制输入框的字符长度，通过maxlength

### 选择文本

这里就跟一个功能相关了，那就是一键复制粘贴功能，这个交互在很多技术网站都有。

这个交互主要有两点：
1. 选择文本
2. 复制到粘贴板上

第一步，选择文本通过调用input、textarea元素的select()函数即可实现，选中文本后，再将对应的value拷贝一份。


**select**

> 该事件在部分浏览器中，用户选中文本后，并即将释放鼠标时触发，或是开发者调用文本框的select函数

另外，浏览器还提供了selectionStart和selectionEnd两个属性来告诉开发者，用户选择的文本起始位置。

**selectionRange()**

