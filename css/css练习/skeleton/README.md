# 骨架屏

骨架屏的实现方法有很多，具体有插入图片或是css样式的。
骨架屏，先是定义了一个大致的页面框架，在加载完数据后骨架屏中各个占位部分都将被真实的数据替换。

### css样式

🌰：./index.html文件。

这个demo的技巧是将父元素设置一个背景色移动动画。然后在通过子元素的定位，遮盖部分位置。使整个页面出现一个大致框架的效果。

> note that: 内容区域一定是有动画效果的区块，其他的都是白背景。
```css
.animated-background {
    animation-duration: 1s;
    animation-fill-mode: forwards;
    animation-iteration-count: infinite;
    animation-name: placeHolderShimmer;
    animation-timing-function: linear;
    background: #f6f7f8;
    background: linear-gradient(to right, #eeeeee 8%, #dddddd 18%, #eeeeee 33%);
    background-size: 800px 104px;
    height: 40px;
    position: relative;
}

@keyframes placeHolderShimmer {
  0%{
      background-position: -468px 0
  }
  100%{
      background-position: 468px 0
  }
}
```

> `animation-fill-mode: forwards;`复习了下这个属性，动画结束后保持的状态, 比如说案例中的保持的效果是100%的状态。


