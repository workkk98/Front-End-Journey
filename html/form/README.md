# form

form表单在整个前端开发中是非常关键的一环。

### checkbox

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