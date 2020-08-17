# HTML 基础知识

1. 为什么使用伪元素时，总是要声明content，否则伪元素(pseudo-element)无效果。

因为伪元素的content初始值是normal，这个效果同```content: none```相同

具体可以看这些文章
[w3c.org](https://www.w3.org/TR/CSS22/generate.html#content)
[stackoverflow](https://stackoverflow.com/questions/17067918/why-do-the-before-and-after-pseudo-elements-require-a-content-property)

2. HTML属性和DOM属性有些是同名的，但有些因为js的保留名称会更名。

例如: 
* class和className