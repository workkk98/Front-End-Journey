# fixed布局

> 固定定位元素的包含块是根元素，我们可以近似的堪称<html>元素。

(这个性质也关系到overflow：hidden的行为。猜测只有根元素可以遮挡，但也没啥意义。)

应用了position: fixed元素后，该元素也块状化了同absolute一致。
可以通过getComputedStyle()这个API来查询元素的display属性。

### 无依赖固定定位

类似于绝对定位，就是基于原本的位置。例如./not-relative.html

这个例子里很奇怪，无论fixed元素原先是行内或块级元素。

父元素.right是流体元素，然后因为text-align:right的原因。就导致“幽灵空白节点“排列在右边，fixed元素就继续排在同一行的后面。

我原本的问题是为啥用div还是span，没区别。仔细想了想，其实无论是span还是div它原本的位置都在第一行上。

### 背景锁定(遮照)

弊端：
1. 背部的内容仍然可以滚动
2. windows下会有滚动条（如果内容过于长，设置了overflow后会导致宽度变化，页面抖动）

解决办法
1. 出现蒙版时，设置html元素overflow: hidden不能滚动
2. 使用border来填补滚动条。