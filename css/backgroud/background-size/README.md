## backgroud-size

backgroud-size用于**调整背景图片大小**，替代了用原始大小显示图片的默认行为，你可以随意的缩放背景图。

例如
```css
.top {
  width: 100%;
  height: 500px;
  background-image: url('IMG_1719.jpeg');
}
```
例如这样，就是把全尺寸的背景图，切了一小部分放在div里。

#### background-size: length|percentage|cover|contain

* length: 设置背景图片的固定长度,若只设一个值，另外按照图片的宽高比自动调整。
* percent: 计算背景容纳块的长度，并使用percent计算出图片对应的宽高，并放置在容纳块中。
* cover: 保持图像的纵横比，把图像缩放成完全**覆盖**容纳快的最小大小。
* contain: 保持图像的纵横比，将图像缩放成将**适合**容纳块的最大大小。

