# z-index

> z-index 属性设定了一个定位元素及其后代元素或 flex 项目的 z-order。 当元素之间重叠的时候， z-index 较大的元素会覆盖较小的元素在上层进行显示。

可案例里的.inner元素设置了z-index: 99， .outer2元素设置了z-index：10，为什么.outer元素能覆盖在.inner元素上。

这里MDN的详细定义。
> 对于一个已经定位的盒子（即其 position 属性值不是 static，这里要注意的是 CSS 把元素看作盒子），z-index 属性指定：

* 盒子在当前堆叠上下文中的堆叠层级。
* 盒子是否创建一个本地堆叠上下文。

由于.inner元素的父类.outer1元素已经创建了堆叠上下文，所以.inner元素的z-index只能说明它在该上下文中的堆叠位置，而.outer1和.outer2在html元素这个堆叠上下文中，所以.outer2比.outer1的任何元素都要高。


### 结论

z-index说明的是自己在某个堆叠上下文中的堆叠位置，而堆叠上下文则是看父元素是否是非static定位和z-index