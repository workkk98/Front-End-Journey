# 值和单位

#### rem

rem根据根元素即html元素font-size计算。
假设默认字号是16px
```css
html {
  font-size: 75%;
  /* 重设默认值，相当于原默认字号 75% */
}
div {
  height: 2rem;
  /* 此时height = 24px */
}
```

### 自定义属性custom property（variable）
优点
* 全局都能使用
* 变量名比16进制表达的更直观，```--main-text-color```
* 变量修改后，全局都会更换色彩。

用法
> 声明一个自定义属性，属性名需要以两个减号（--）开始，**属性值则可以是任何有效的CSS值**。和其他属性一样，自定义属性也是写在规则集之内的。
```css
/* 伪类root */
:root {
  --custom-font-color: red;
}
```

tips:
自定义属性名是大小写敏感的，--my-color 和 --My-color 会被认为是两个不同的自定义属性。

**性质**

* 继承性，从:root声明自定义属性也能说明这一点，为什么全局元素都能拿到。因为都继承了。
* 有效性和值，自定义变量可以是任何有效的css属性，这也带来了问题，比方说把长度单位分配给了颜色。
这个时候会依次使用继承值和初始值。


该变量也是可以通过js获取的，

```js
// 获取一个 Dom 节点上的 CSS 变量
element.style.getPropertyValue("--my-var");

// 获取任意 Dom 节点上的 CSS 变量
getComputedStyle(element).getPropertyValue("--my-var");

// 修改一个 Dom 节点上的 CSS 变量
element.style.setProperty("--my-var", jsVar + 4);
```