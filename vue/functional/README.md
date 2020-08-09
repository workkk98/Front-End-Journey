# functional组件

尤大是这么形容functional组件的：
> 当你需要一个组件，它只是表示一个静态的状态，你可以声明这个组件是函数组件

用法
```js
  var foo = {
    functional: true,
    render (h) {
      return h('div', 'placeholder')
    }
  }
```

### 粗略的测试

按照index.html
函数组件渲染1000个：22ms
普通组件渲染1000个：150ms

这个差距还是很大的

### context

因为函数组件不会构建自己的vue实例，所以快了很多，但是我们可以在render函数中获取context参数，获取根实例的状态。

```js

// example

  var foo = {
    functional: true,
    render (h, context) {
      return h('div', 'placeholder')
    }
  }
```