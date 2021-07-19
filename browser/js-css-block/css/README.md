# css是如何间接影响DOM解析的

实际上就是通过js脚本。我们知道js脚本会阻塞dom的解析，因为它可能操作dom，当js需要操作css时呢？

JavaScript 代码出现了 div1.style.color = ‘red' 的语句，它是用来操纵 CSSOM 的，**所以在执行 JavaScript 之前，需要先解析 JavaScript 语句之上所有的 CSS 样式。**所以如果代码里引用了外部的 CSS 文件，那么在执行 JavaScript 之前，还需要等待外部的 CSS 文件下载完成，并解析生成 CSSOM 对象之后，才能执行 JavaScript 脚本。

具体可以看`css-block-js.png`中的例子。
