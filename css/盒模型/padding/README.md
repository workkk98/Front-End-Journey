# padding

1. padding没有负值。
  margin有负值的原因是，它的意义是元素空间的距离。在我认为padding想要表示的是，content-box在整个border框内的摆放位置。
2. 内联元素padding对视觉层和布局具有双重影响。
3. padding的百分比值。
  对于内联元素，padding是会断行的。产生原因是，内联元素的padding是根据父元素计算的（我猜测是没有内联元素具体的长度），因为长度超过父元素，所以换行了。换行后字的padding会跟着行框下去，产生了这样子的现象。