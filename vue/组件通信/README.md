# vue 组件通信

### $attrs - $listeners

$listeners感觉就像是在创建组件时，扩展成了

```vue
  <son v-on="$listeners"></son>

  <son v-on:a="a" v-on:b="b">
```

说个结论，就是子组件作用域会拿到父组件的函数，然后当触发事件后，通过$emit调用父组件的事件。