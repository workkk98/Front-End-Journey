# grid布局

## 创建栅格容器

display: grid创建的是块级栅格。但其布局行为与块级容器很像，但是二者之间有诸多区别。

1. 栅格容器的外边距不与其后代的外边距折叠。而块级框的外边距默认与其后代的外边距折叠。(除非有padding，或border)

#### 基本的栅格术语

栅格轨道: 指两条相邻的栅格线之间夹住的整个区域，从栅格容器的一边延伸到对边，即栅格列或栅格行。
栅格单元: 栅格布局中区域的最小单位。
栅格区域: 由一个或多个栅格单元构成。

#### 放置栅格线

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

## 在栅格中附加元素

具体就是通过属性例如grid-column-start，指定栅格元素起始边附加到具体某条栅格线上。

**span**
span关键词，可以指明，具体跨越几条轨道或者说是跨过几条线。
> span的特殊之处在于，结束和开始栅格线都能使用。具体行为是，向确定了编号的栅格线的反方向

```css
    .one {
      grid-column-start: 2;
      grid-column-end: 4;
      grid-row-start: 2;
      grid-row-end: 4;
      background-color: lightgray;
    }
```

除了用栅格线的数字编号来指代栅格线外，还可以使用具体的名称。

**行和列的简写属性**

grid-row, grid-column

```css
    .three {
      background-color: lightpink;
      grid-column: 15 / 17;
      grid-row: 3 / 4;
    }
```

#### 隐式栅格

具体就是，浏览器在搜索具体栅格后未找到对应名称的栅格线后，会自动创建该名称的隐式栅格。

#### 使用区域

grid-area: grid-line [ / grid-line]{0,3}

值得一提的是，栅格线放置的顺序是逆时针的，与盒元素外边距等设置的顺序相反。


## 栅格流

因为栅格元素有可能重叠，所以有栅格流这个概念。
#### 栅格元素重叠
./repeat-grid-item.html
> 与定位元素一样，栅格元素是完全有可能重叠的。


#### grid-auto-flow

该属性指定，栅格元素的摆放位置。
> 栅格流指定后，浏览器放置的其实是栅格区域，然后再把栅格元素附加到栅格区域中。

具体的例子，指定grit-auto-flow: row;后，浏览器先按行一个个把栅格单元放进去，再把元素放进对应的单元中，

#### grid-auto-rows/grid-auto-columns

这里千万得和grid-rows/grid-columns区分开来。一个是用于容器隐式栅格轨道的具体长度，另一个是指定元素具体依附与哪条栅格线。

#### grid属性

先来个例子./grid.html
```css
  .default-grid {
      display: grid;
      grid: "header header header header" 5em
            "leftside section section rightside" 5em
            "footer footer footer footer" 5em /
            2fr 35% 35% 2fr;
      height: 15em;
  }
```

先不考虑grid-template-area的属性混入，grid-template-row和grid-template-columns就按照先行再列的顺序，中间通过 "/" 隔开。

例子: 5em 5em 5em / 2fr 35% 35% 2fr;

## 释放栅格空间

#### 栏距

grid-row-gap | grid-column-gap | grid-gap

> 起初是用 grid-gap 属性来定义的，目前逐渐被 gap 替代。但是，为了兼容那些不支持 gap 属性的浏览器，你需要像上面的例子一样使用带有前缀的属性。

也就是说可以使用row-gap或是column-gap来替代。

#### 栅格元素和盒模型

> 元素在外边距的边界处附加到栅格中。换句话说，外边距的边贴合栅格区域边界。

栅格元素如果是绝对定位元素，那么对应的定位上下文是谁？
结论是：
开始栅格线和结束栅格线围城的栅格区域用作容纳块和定位上下文。

## 栅格的对齐方式

弹性盒有justify-content, align-items, align-self等对齐方式，这些在grid布局中也能使用，而且作用十分相似。

## 分层和排序

z-index 和 order