# relative

> The element is positioned according to the normal flow of the document, and then offset relative to itself based on the values of top, right, bottom, and left. The offset does not affect the position of any other elements; thus, the space given for the element in the page layout is the same as if position were static.

正如MDN所描述的，元素基于原本在流中的位置定位，然后根据一些属性进行偏移。关键是这些偏离量（offset）不会影响到其他的元素。

position: relative和 tranform: translate()函数没啥大区别都是，基于原本的位置进行偏移。其偏移不会影响到其他元素。但区别就是在动画效果上，translate会更优异。