# sticky粘性布局

### 基本概念

元素根据正常文档流进行定位，然后相对它的**最近滚动祖先**（nearest scrolling ancestor）和 containing block (**最近块级祖先** nearest block-level ancestor)，包括table-related元素，基于top, right, bottom, 和 left的值进行**偏移**。偏移值不会影响任何其他元素的位置。（这里要注意会根据容纳块的偏移量而定位。）

该值总是创建一个新的层叠上下文（stacking context）。注意，一个sticky元素会“固定”在离它最近的一个拥有“滚动机制”的祖先上（当该祖先的overflow 是 hidden, scroll, auto, 或 overlay时），即便这个祖先不是最近的真实可滚动祖先。这有效地抑制了任何“sticky”行为（详情见Github issue on W3C CSSWG）。

### 基本使用

在使用的时候需要注意一点，一定要设置某个方向固定的位置，否则起不到fixed的效果
```css
nav {
    position: -webkit-sticky;
    position: sticky;
    top: 0;
}
```

在滚动容器的时候，"表头元素"就如同fixed一样，被定位在了离父容器固定top的地方。

有趣的一点：
我发现sticky元素的高度，会让cousin元素偏移他的高度位置。例如demo中的例子，无论你把sticky元素top设置不同的高度，都会使得`content`元素以它的元素高度偏移。（通过元素的offsetTop得出来的）

### 你可能不知道的position: sticky

转自张鑫旭的博客：
1. 父级元素不能有任何overflow:visible以外的overflow设置，否则没有粘滞效果。因为改变了滚动容器（即使没有出现滚动条）。因此，如果你的position:sticky无效，看看是不是某一个祖先元素设置了overflow:hidden，移除之即可。（不太能理解为啥这么说）
2019-05-22新增
2. 父级元素设置和粘性定位元素等高的固定的height高度值，或者高度计算值和粘性定位元素高度一样，也没有粘滞效果。我专门写了篇文章深入讲解了粘性效果无效的原因，可以点击这里查看。
3. 同一个父容器中的sticky元素，如果定位值相等，则会重叠；如果属于不同父元素，且这些父元素正好紧密相连，则会鸠占鹊巢，挤开原来的元素，形成依次占位的效果。至于原因需要理解粘性定位的计算规则，同样点击这里查看。
4. sticky定位，不仅可以设置top，基于滚动容器上边缘定位；还可以设置bottom，也就是相对底部粘滞。如果是水平滚动，也可以设置left和right值。

### 容纳块 和 最近祖先滚动元素

可以从question-2.html和question-2(2).html文件中看到。

postion:sticky元素先是在原先到位置上（体现了relative的特性），当它

### 参考文章

[张鑫旭 position: sticky](https://www.zhangxinxu.com/wordpress/2018/12/css-position-sticky/)
[MDN: position](https://developer.mozilla.org/zh-CN/docs/Web/CSS/position)