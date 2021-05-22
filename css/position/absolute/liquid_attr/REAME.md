# absolute的流体特性

普通的块级元素流体特性，是自适应容纳块的宽度，难道absolute元素也有这样的效果吗？

### 特定条件

> 对立方向同时发生定位的时候

举个例子就是有left和right时，就会使这个方向上的绝对定位元素有流体的特性。
既然是流体元素了，那它必然会有自适应性，例如在./index.html的例子中，绝对定位.foo元素，宽度恰好是相对元素的contentbox。

### 流体特性的衍生物

margin: auto这个属性也就可以大展身手。可以用于水平居中，更厉害的是还能实现垂直居中。./margin-auto的例子