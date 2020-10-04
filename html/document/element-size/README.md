# 元素大小

这章节还是蛮重要的.

### client

* clientWidth
MDN介绍到这个关键词指代的是客户区的大小，在border以内的内容区域（不包含border），包括垂直滚动条

### scroll相关

在学习element-scrollbar这个组件的时候，复习了下这个知识。
就如同人的眼睛，并不能看到所有的事物一样。scroll的存在就是为了隐藏超出视口的内容。

所以一般来说会有这样的结构。
```html
<div class="wrap">
  <div class="inner"></div>
</div>
```

`.wrap`元素作为一个视口元素，它知道它内部元素的高度和宽度，即scrollHeight和scrollWidth。然后也能知道视口在整个画布的位置，即scrollTop和scrollWidth。

#### 总结

1. 偏移量宽高 包含元素边框+内边距+内容 => 边框及边框内的大小
2. 客户区大小 包含元素内边距+内容 => 边框内的大小
3. 滚动元素大小 被隐藏内容的宽高，以及视口在隐藏内容中的位置scrollTop, scrollLeft
4. getBoundingClientRect() 获取该元素离**视口的距离**以及自己客户区的宽高