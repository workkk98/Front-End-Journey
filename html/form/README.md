# form

form表单在整个前端开发中是非常关键的一环。

### FORM元素

在html中它是FORM元素，但在js中他就是HtmlFormElement,这个元素除了具有父类型的属性外，也派生了很多新的属性。

* elements 子元素集合
* action 请求的web路径
* reset() 重置所有

**提交表单， submit事件**

* 第一种方法: button
> 当你把一个button放在form表单里，然后调用form表单的reset函数，为什么会触发get请求，在当前资源下加个query？

解答： 只要表单内存在**input-submit**、**button-submit**、**input-image**这些控件，都会提交表单。

form表单内的组件获得焦点的情况下，用户点击回车按钮就会触发提交表单的行为(除textarea之外)。可校验表单怎么处理？其实在form表单提交前，会触发**submit事件**，这时开发者就可以做表单校验的处理了。

* 第二种方法：form.submit()

函数式的提交方法，但这种方法不会触发submit事件，所以开发者得在手动调用前，校验表单。

**重置表单， reset事件**

* ```<input type="reset">   <button type="reset"></button>```
* form.reset()

> 注意，reset会让表单回到页面初始化的值!!!

同样重置表单，也会触发reset事件，不同的是调用form.reset()也会触发reset事件。

### 表单字段

**访问表单字段**
通过form.elements属性来访问输入控件。

**公有属性**

这里只提到最经常使用的属性。
* name
* value
* diabled
* readonly

> 值得一提的是，在form表单中，最常用的就是表单置灰的功能了，当用户提交表单后，都需要将按钮置灰，避免重复提交。这里要避免一个情况，因为这个步骤产生了两个主要事件，click和submit。不同浏览器的顺序是不同的，假设在click的事件处理程序中置灰了，就导致form表单不能提交了

**公有方法**

激活，移走焦点
* focus
* blur

当然HTML5支持了元素的自动激活，```autofocus```

**事件**

* focus
* blur
* change

这些事件开发者通常用来提示用户输入的合法性。

**checkbox**

checkbox很诡异，原以为checked属性就是来控制checkbox的选中或非选中，但实际上并不是。

这里引出了，一个说法。HTML属性和DOM属性，打个比方，每个HTML节点属性有class，但JS获取DOM节点后，我们得用className来修改，所以这里也是一样的道理。

> 但又不对，通过操作checkbox的checked属性，是可以控制节点是否打勾，区别就在于，如果你阻止了checkbox的默认事件，那在这个宏任务里，你是无法操作的，可以用下个宏任务去修改它的属性。

```js
AR.addEventListener('click', function (e) {
  e.preventDefault();

  // 模拟延时操作
  setTimeout(() => {
    AR.checked = !AR.checked;
  }, 1000)
})
```