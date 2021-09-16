# BFC

> 块格式化上下文（Block Formatting Context，BFC） 是Web页面的可视化CSS渲染的一部分，是块盒子的布局过程发生的**区域**，也是浮动元素与其他元素交互的区域。摘自MDN

> 它是一个独立的**渲染区域，只有Block-level box参与（在下面有解释）， 它规定了内部的Block-level Box如何布局，并且与这个区域外部毫不相干。我们常说的文档流其实分为定位流、浮动流和普通流三种。而普通流其实就是指BFC中的FC。**
**FC是formatting context的首字母缩写，直译过来是格式化上下文，它是页面中的一块渲染区域，有一套渲染规则，决定了其子元素如何布局，以及和其他元素之间的关系和作用。**
常见的FC有BFC、IFC（行级格式化上下文），还有GFC（网格布局格式化上下文）和FFC（自适应格式化上下文），这里就不再展开了。 --摘自掘金

## 生成BFC的方法
* 根元素(<html>) 
  令我好奇的是html元素也能用class（谁说不能呢?）。更好玩的是，背景色直接影响到了视口。
* 浮动元素（元素的 float 不是 none）
* 绝对定位元素（元素的 position 为 absolute 或 fixed）
* 行内块元素（元素的 display 为 inline-block）
* 表格单元格（元素的 display为 table-cell，HTML表格单元格默认为该值）
* 表格标题（元素的 display 为 table-caption，HTML表格标题默认为该值）
* 匿名表格单元格元素（元素的 display为 table、table-row、 table-row-group、table-header-group、table-footer-group（分别是HTML table、row、tbody、thead、tfoot的默认属性）或 inline-table）
* overflow 值不为 visible 的块元素
* display 值为 flow-root 的元素
* contain 值为 layout、content或 paint 的元素
* 弹性元素（display为 flex 或 inline-flex元素的直接子元素）
* 网格元素（display为 grid 或 inline-grid 元素的直接子元素）
* 多列容器（元素的 column-count 或 column-width 不为 auto，包括 column-count 为 1）
* column-span 为 all 的元素始终会创建一个新的BFC，即使该元素没有包裹在一个多列容器中（标准变更，Chrome bug）。

## BFC布局规则
1.内部的Box会在垂直方向，一个接一个地放置。

2.Box垂直方向的距离**由margin决定**。属于同一个BFC的两个相邻Box的margin会发生重叠

3.每个元素的margin box的左边， 与包含块content box的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此。

4.**BFC的区域不会与float box重叠。但可以通过盒属性来实现重叠**

5.**BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。**

6.**计算BFC的高度时，浮动元素也参与计算**
