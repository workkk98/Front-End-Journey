# Reflect

> 意义：为了操作对象而提供的新API

* Reflect.get(target, name[, recevier])

函数化取对象值
如果目标属性是个getter函数，则调用这个函数取值，如果有recervier对象，则getter函数的this指向recevier

* Reflect.set(target, name, value[, recevier])

向target对象的name属性赋值。
如果对象有setter函数，则调用该函数，如果有recevier对象，则setter函数的this指向recevier

> set会被proxy的difineProperty拦截

* Reflect.has(target, name)

判断target是否有该属性

* Reflect.deleteProperty(target, name)

删除target的name属性

* Reflect.construct(target, args)

等同于 new Target(...args)
> 注意args是个数组,target也得是个构造函数才有用。

* Reflect.getPrototypeOf(target)

```= Object.getPrototypeOf()```
区别在于，Object.getPrototypeOf这个方法会把基础变量隐式转换成对象，在获取它的原型对象。Reflect则不会。

* Reflect.setPrototypeOf(target, prototype)

```= Object.setPrototypeOf()```

* Reflect.apply(func, thisArg, args)

```= Function.prototype.apply.call(func, thisArg, args)```
这个语句有点绕，那call方法但实质就是把某个函数放在对象内部，所以等价于func.apply(thisArg, args)

这个是为了假如func的apply方法重写了，我们就得这样操作了。

* Reflect.defineProperty()

```= Object.defineProperty()```, 非常经典的一个函数。

* Reflect.isExtensible(target)

```= Object.isExtensible ```

* Reflect.preventExtensions(target)

```= Object.preventExtensions```

* Reflect.ownKeys(target)

```= Object.getOwnPropertyNames + Object.getOwnPropertySymbols```