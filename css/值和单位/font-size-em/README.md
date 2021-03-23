# em

> em在传统排版中指一个字模的**高度**（可以脑补下活字印刷的字模）。
> 其一般由'M'的宽度决定（因为宽高相同），所以叫em。

## 关于em的计算

em是根据本元素的font-size计算的。这要牢记，所以如果遇到这种情况：

```css
  .foo {
    font-size: 2em;
    margin: 1em;
  }
```

本元素的font-size是2em。因为本元素继承了祖先元素的font-size，假设为16px。本元素的font-size就计算得出32px。那此时em这个单位就成了32px，margin就为32px。

具体可以看./index.html的例子。

但值得一提的是，em先是16px又是32px，这不会重新导致font-size再计算吗？答案是不会的，浏览器的渲染就是一次计算。