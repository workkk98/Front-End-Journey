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