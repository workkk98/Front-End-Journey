# watcher

#### RenderWatcher
在我看来watcher对象对于Vue来说非常重要。之前总是想不明白Vue是怎么更新视图的，以及beforeUpdate、updated这两个钩子函数的由来。
秘密其实藏在\$mount()函数中，仔细看\$mount()中的代码，会有创建一个watcher，这个watcher实际上就是**renderwatcher**对象，Vue给它传递了一个函数_update(_render())。而且watcher在声明过程中，已然把自己指向了dep。target，在后续依赖收集时，该**renderwatcher**就会被收集到data的dep中中。当watcher调用这个update函数时，当然先调用render函数，render函数是用户手写模版编译成的，也可能是用户用JSX手写的。大致可能是这样。

```js
  data () {
    return {
      title: 'renderwatcher'
    }
  },
  render (h) {
    return h('div', null, [this.title])
  }
```
当执行render函数时，**renderwatcher**就被收入了this.title的dep中。所以当title更新时，**renderwatcher**就会触发更新事件。那两个钩子函数。。。
