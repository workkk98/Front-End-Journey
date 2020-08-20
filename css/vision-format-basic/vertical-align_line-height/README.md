# vertical-align 和 line-height

在开发的过程中，我慢慢发现，inline-block元素慢慢不遵循我记忆深处的底边对其基线这一要点。

(基线图)[!./410px-Typography_Line_Terms.svg.png]
[x-height](https://www.zhangxinxu.com/wordpress/2015/06/about-letter-x-of-css/
)
这说明，肯定是我的知识掌握的不够，所以重新学习


### 1. vertical-align的百分比根据line-height的实际大小

比如```line-height: 30px```, 那么10%的vertical-align， 就是3px。


### inline-block为什么对齐的是基线

我其实忽视了一点，每个inline元素的初始值都是```vertial-align: baseline```

但问题还有，到底是哪条边对齐呢？


### vertical-align

要注意对齐本身说明了两个物体之间按照某个标准对齐，然后细看这几个属性的描述。

[MDN 垂直对齐](https://developer.mozilla.org/zh-CN/docs/Web/CSS/vertical-align)


* baseline

使元素的基线对齐父元素的基线。

* top
* middle
* bottom

但top/middle/bottom等描述的是元素的某个位置对齐父元素的整行的某个位置，

例如，top就指元素的顶部对齐父元素整行的顶部。


### 特殊的inline-block
> 一个inline-block元素，如果里面没有inline内联元素，或者overflow不是visible，则该元素的基线就是其margin底边缘，否则，其基线就是元素里面最后一行内联元素的基线。

那如果是inline-block套inlineblock，只要它们里面没东西，基线就是底边。

### font-size为0

这就说明字符的各种线例如基线，中线，顶部的线，底部的线都重合在一起了。



### lab-实验4

中线是line-height = 0的重合线，而baseline是由x的大小决定的。

### 实验5

当line-height = 0时， 每行都中线都会重合。