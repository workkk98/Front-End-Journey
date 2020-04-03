# transition

做笔试的时候遇到了相关的内容，所以在这里回忆下。

transition属性即过渡，是4个分支属性的总和

它有四个分支属性分别是
1. transition-property 过渡的属性
2. transition-duration 过渡的时长
3. transition-timing-function 时间函数
4. transition-delay 延迟时间

**transition-property**

> 能触发的属性有很多方式。例如动态增加class, **输入框的状态从:invalid -> :valid**, **或有:checkd变成:not(:checked)**。甚至，还可以利用:nth-last-of-type等选择符在斑马纹表哥末尾追加一行，或者在列表的末尾追加一个列表的项目。

这段话给了我很多感触吧。过渡核心是描述某个属性到另外一个属性的变化过程，所以你只要改变了那个属性，通过哪种方法都是可以的。

// review.html


**过渡结束事件 transitionend**

假设elem是个div元素，elem.addEventListener('transitionend' , function (e) {
  e.propetyName; // 具体那个属性
})