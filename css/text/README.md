# 文本属性

#### 缩紧文本

text-indent这个属性只适用于块级元素。

#### 文本对齐

text-align也只适用于块级元素，用于控制各文本行的对齐方式。

#### 对齐最后一行

text-align-last用于控制文本元素的最后一行，也会影响其他行内容。只适用于块级元素。
> 只要一行后面有强制换行，不管是不是在元素的末尾，都受text-align-last属性的控制。


## 纵向对齐

#### vertical-align

如果我们在div里放一张图片，我们可以看到div总是内容区底部会多出一“行”空白。
> 如果目标元素没有基线，例如图像、表单输入框或其他置换元素，元素的低端与父元素的基线对齐。

## 单词间距

值得一提的是，中文每个字都是字符，所以letter-spacing对其有效。
**word-spacing控制的应该是每个字符间空白的距离。**

#### word-spacing

单词间的距离

#### letter-spacing

字符或字母间的距离。

## 处理空白

> XHTML在某种程度上已经做了处理，即把空白压缩成一个空格。因为默认的white-space属性是normal，它把多余的空格折叠。

#### white-space

pre属性值实际上是preserve单词的缩写即保留。

normal   折叠空白
nowrap   不允许换行
pre      保留空白
pre-line 保留换行
pre-wrap 保留换行，保留空白

