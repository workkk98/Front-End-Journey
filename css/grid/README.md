# grid布局

## 创建栅格容器

display: grid创建的是块级栅格。但其布局行为与块级容器很像，但是二者之间有诸多区别。

1. 栅格容器的外边距不与其后代的外边距折叠。而块级框的外边距默认与其后代的外边距折叠。(除非有padding，或border)

## 基本的栅格术语

栅格轨道: 指两条相邻的栅格线之间夹住的整个区域，从栅格容器的一边延伸到对边，即栅格列或栅格行。
栅格单元: 栅格布局中区域的最小单位。
栅格区域: 由一个或多个栅格单元构成。

## 放置栅格线

grid-template-columns定义栅格列
grid-template-rows定义栅格行

值得一提的是，属性值百分号是以整个容器的宽、高来设置的。

**为栅格线命名**
```css
  .grid {
    display: grid;
    grid-template-columns: [a] 200px [b] 50% [c] 100px [d];
    grid-template-rows: [a] 200px [b] 50% [c] 100px [d];
    height: 200px;
  }
```
栅格行与栅格列的命名空间都独有的，所以重名也没关系。

> minmax()该函数可以定义栅格线的最小值和最大值，浏览器会计算。也可以使用calc()

1. 份数单位fr
fr = fractions，意味着分数。
> fr可不只是百分数的替代品这么简单，它还有更强大的功能。在某些列的尺寸固定，而部分空间弹性伸缩时，份数单位特别有用。剩余的部分按照份数分给带有fr单位的所有轨道。

计算顺序是固定长度，百分数，份数。
```css
.grid {
  width: 100em;
  grid-template-columns: 15em 4.5fr 3fr 10%;
}
```
举个例子，这里的style中，容器宽度为100em。
100em先分出去15em固定长度，然后是100em的10%也就是10em，最后剩余75em，按照比例分给余下两列。

2. max-content, min-content

两个关键字，应用于整个轨道。
* max-content：占据内容所需的最大的空间。
* min-content：尽量少占据空间，够显示内容即可。

3. fit-content(argu)函数

**重复栅格线**
用法：
repeat(执行次数n, 若干个间距m)
产生的轨道数 = n*m

例子：
```css
.grid {
  grid-template-columns: repeat(2, 2em 3em 4em)
}
```

产生6个轨道，依次是2em, 3em, 4em, 2em, 3em, 4em。
repeat函数似乎就是一个语法糖，在正式生成规则前，会自动展开。它里面可以使用任何关键词，也可以命名栅格线名称。

开启auto-fill模式
repeat(auto-fill, 若干个间距)

**grid-template-areas**
这个挺有意思的，通过用string来表示栅格区域。

```css
.grid {
  display: grid;
  grid-template-area:
    "h h h h"
    "l c c r"
    "l f f f";
}
```

注意: 浏览器会把同名的字符串合成为同一个区域，如果区域太复杂，就比如说是“L”型的，grid-template-area属性就无效了。

> 另外，如果你想把栅格单元不归到任何区域里，可以用空单元标记。标记为"..."