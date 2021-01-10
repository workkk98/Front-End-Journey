# Proxy

Vue 3.0中对响应式数据使用了Proxy这个API，这个API对于数组的支持性会更友好。
proxy就同语义一样，是一个代理对象。通过用户自定义函数，读写这个代理对象时（实际最后的目的都是读写target对象），覆盖语言的原始定义。类似于中间层的概念。

> 直接读写原对象是没有用的。

### 语法

```js
var proxy = new Proxy(target, handler);
```

本质上，proxy也是个对象。在JS的原型继承的这个模式中，proxy也可以被当作原型被继承。


### handler对象

* get(target, key, recevier)

即访问对象的某个属性时做拦截。
前两个参数很好理解，但是第三个参数`recevier`就蛮奇怪的，这个参数指向proxy对象本身？

> 如果通过reflect.get(target, name, recevier)，方法访问proxy对象, 则`receiver`参数就是reflect传递的recevier对象。否则就指向target本身。

类推到Reflect.get(target, key, recevier)。访问到目标对象，如果对象有设置get函数用this，此时this就指向receciver。这个例子可以看../reflect/index.js

> 对象的某个属性是配置属性（configurable）设置为false的时候, 就强制proxy返回的数据和target对象得返回的一致。
> 例如get.js中的例子。
> Uncaught TypeError: 'get' on proxy: property 'bar' is a read-only and non-configurable data property on the proxy target but the proxy did not return its actual value (expected 'bar' but got 'foo')

补充一个知识点：
configurable为false，删除这个属性或修改属性的（enumerable, writalbe, configurable)都会失败。

* set(target, key, value)
拦截赋值操作。

* apply(target, ctx, args)

target目标对象，ctx是调用proxy"函数"时的上下文，args是参数数组。