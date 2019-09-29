# computed 的实现机制 （订阅发布模式）


该属性是在 src/core/instance/state.js，中的**initState函数**中完成的


```export function initState (vm: Component) {
  vm._watchers = []
  const opts = vm.$options
  if (opts.props) initProps(vm, opts.props)
  if (opts.methods) initMethods(vm, opts.methods)
  if (opts.data) {
    initData(vm)
  } else {
    observe(vm._data = {}, true /* asRootData */)
  }
  // computed初始化
  if (opts.computed) initComputed(vm, opts.computed)
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch)
  }
}
```

在中间我们也能看到，初始化顺序是 data > computed > watch，(我觉得，watch能观察computed的属性也和这一顺序也有关，暂没有考证)

----

## 再深究下 initComputed()函数

```
const computedWatcherOptions = { computed: true }

function initComputed (vm: Component, computed: Object) {
  // $flow-disable-line
  const watchers = vm._computedWatchers = Object.create(null)
  // computed properties are just getters during SSR
  const isSSR = isServerRendering()

  for (const key in computed) {
    const userDef = computed[key]
    const getter = typeof userDef === 'function' ? userDef : userDef.get 
    if (process.env.NODE_ENV !== 'production' && getter == null) {
      warn(
        'Getter is missing for computed property "${key}".',
        vm
      )
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      )
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef)
    } else if (process.env.NODE_ENV !== 'production') {
      if (key in vm.$data) {
        warn('The computed property "${key}" is already defined in data.', vm)
      } else if (vm.$options.props && key in vm.$options.props) {
        warn('The computed property "${key}" is already defined as a prop.', vm)
      }
    }
  }
}

```

`const getter = typeof userDef === 'function' ? userDef : userDef.get`

先看这一段代码，这说明了 computed中的写法 ，有两种
- key : function() {}
- key : {get() {}}


 `  watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      )
    }`

在观察者对象中分别加入watcher实例 ， 参数分别是 vue实例，上面获得的getter方法 ，**noop空函数** ，**computedWatcherOptions 常量对象**

```
class Watcher {
  constructor (
    vm: Component,
    expOrFn: string | Function,
    cb: Function,
    options?: ?Object,
    isRenderWatcher?: boolean
  ) {
    if (options) {
      this.computed = !!options.computed
    } 

    if (this.computed) {
      this.value = undefined
      this.dep = new Dep()
    } else {
      this.value = this.get()
    }
  }
  
  get () {
    pushTarget(this)
    let value
    const vm = this.vm
    try {
      value = this.getter.call(vm, vm)
    } catch (e) {
      
    } finally {
      popTarget()
    }
    return value
  }
  
  update () {
    if (this.computed) {
      if (this.dep.subs.length === 0) {
        this.dirty = true
      } else {
        this.getAndInvoke(() => {
          this.dep.notify()
        })
      }
    } else if (this.sync) {
      this.run()
    } else {
      queueWatcher(this)
    }
  }

  evaluate () {
    if (this.dirty) {
      this.value = this.get()
      this.dirty = false
    }
    return this.value
  }

  depend () {
    if (this.dep && Dep.target) {
      this.dep.depend()
    }
  }
}

```

传入的第四个参数 `{ computed: true }` , 对对象自身属性computed修改为true, 也就是说创建了 该观察者的消息订阅器

```
    if (options) {
      this.computed = !!options.computed
    } 
    if (this.computed) {
      this.value = undefined
      this.dep = new Dep()
    } else {
      this.value = this.get()
    }
```

```
export default class Dep {
  static target: ?Watcher;
  subs: Array<Watcher>;

  constructor () {
    this.id = uid++
    this.subs = []
  }

  addSub (sub: Watcher) {
    this.subs.push(sub)
  }

  depend () {
    if (Dep.target) {
      Dep.target.addDep(this)
    }
  }

  notify () {
    const subs = this.subs.slice()
    for (let i = 0, l = subs.length; i < l; i++) {
      subs[i].update()
    }
  }
}

Dep.target = null
```
>watcher 中实例化了 dep 并向 dep.subs 中添加了订阅者，dep 通过 notify 遍历了 dep.subs 通知每个 watcher 更新。


最后一步, 
因为computed属性是直接挂载到实例上去到，需要判断vm是否有重名到属性

```
if (!(key in vm)) {
  defineComputed(vm, key, userDef)
} else if (process.env.NODE_ENV !== 'production') {
  if (key in vm.$data) {
    warn('The computed property "${key}" is already defined in data.', vm)
  } else if (vm.$options.props && key in vm.$options.props) {
    warn('The computed property "${key}" is already defined as a prop.', vm)
  }
}
```

最后看一下 defineComputed()
经过一系列操作 ， **还需要重新看下这系列操作**



```
export function defineComputed (
  target: any,
  key: string,
  userDef: Object | Function
) {
  const shouldCache = !isServerRendering()
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : userDef
    sharedPropertyDefinition.set = noop
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : userDef.get
      : noop
    sharedPropertyDefinition.set = userDef.set
      ? userDef.set
      : noop
  }
  if (process.env.NODE_ENV !== 'production' &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        'Computed property "${key}" was assigned to but it has no setter.',
        this
      )
    }
  }
  Object.defineProperty(target, key, sharedPropertyDefinition)
}
```

**sharedPropertyDefinition对象**

```
sharedPropertyDefinition = {
    enumerable: true,
    configurable: true,
    get: function computedGetter () {
        const watcher = this._computedWatchers && this._computedWatchers[key]
        if (watcher) {
            watcher.depend()
            return watcher.evaluate()
        }
    },
    set: userDef.set || noop
}

```

>当计算属性被调用时便会执行 get 访问函数，从而关联上观察者对象 watcher 然后执行 wather.depend() 收集依赖和 watcher.evaluate() 计算求值。



>分析完所有步骤，我们再来总结下整个流程：

* 当组件初始化的时候，computed 和 data 会分别建立各自的响应系统，Observer遍历 data 中每个属性设置 get/set 数据拦截

* 初始化 computed 会调用 initComputed 函数

* 注册一个 watcher 实例，并在内实例化一个 Dep 消息订阅器用作后续收集依赖（比如渲染函数的 watcher 或者其他观察该计算属性变化的 watcher ）

* 调用计算属性时会触发其Object.defineProperty的get访问器函数

* 调用 watcher.depend() 方法向自身的消息订阅器 dep 的 subs 中添加其他属性的 watcher

* 调用 watcher 的 evaluate 方法（进而调用 watcher 的 get 方法）让自身成为其他 watcher 的消息订阅器的订阅者，首**先将 watcher 赋给 Dep.target**，然后执行 getter 求值函数，当访问求值函数里面的属性（比如来自 data、props 或其他 computed）时，会同样触发它们的 get 访问器函数从而将该计算属性的 watcher 添加到求值函数中属性的 watcher 的消息订阅器 dep 中，当这些操作完成，最后关闭 Dep.target 赋为 null 并返回求值函数结果。

* 当某个属性发生变化，触发 set 拦截函数，然后调用自身消息订阅器 dep 的 notify 方法，遍历当前 dep 中保存着所有订阅者 wathcer 的 subs 数组，并逐个调用 watcher 的  update 方法，完成响应更新

> 大部分知识从这篇文章中获悉

[创宇前端](https://juejin.im/post/5b98c4da6fb9a05d353c5fd7)