# margin

margin是空间上的距离。

在渲染上一定要理解这样的一个概念：视觉层和布局层。布局层会影响其他元素的位置，例如margin，padding等
视觉层就如border-shadow，只是在视觉上多了效果，没有其他的影响。

### 等高模型

1. 使用正padding和负margin，两两抵消。可以说在布局层上后面的元素不会受到任何影响，但是padding是实实在在存在了呀。当某个子元素的**content内容**大于另一个子元素的时候，就成为了父元素的高度。而另外一个子元素的则是用content不足，但是可以用padding来补。

### margin: auto

> css世界里这么说，margin: auto就是为了填充剩余空间而设计的。
例如, 一个块级元素div，它的父元素也是个div，占满了整个html容器的宽度。
子元素的如果width定义成200px，那么只能由margin来填充这个剩余空间。

所以margin: auto的应用条件是width或height值可以是auto的时候。

另外还可以推广到定位元素。具体看./position.html