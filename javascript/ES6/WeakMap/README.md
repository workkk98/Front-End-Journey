# WeakMap

### 使用

1. WeakMap只接受对象作为键名。
2. WeakMaps hold "weak" references to key objects.
  > WeakMaps 保持了对**键名所引用的对象**的弱引用。
3. WeakMap实例无法遍历（因为弱引用的特性）
  
弱引用的概念：
一个对象若只被弱引用所引用，则被认为是**不可访问**（或弱可访问）的，并因此可能在任何时刻被回收。

### 实验

先使用node命令行，接下来可以手动触发垃圾回收
> node --expose-gc ./test.js

```js
global.gc();
// 返回 Nodejs 的内存占用情况，单位是 bytes
process.memoryUsage(); // heapUsed: 3MB左右

let map = new Map();
let key = new Array(5 * 1024 * 1024);
map.set(key, 1);
global.gc();
process.memoryUsage(); // heapUsed: 44MB左右

map.delete(key);
key = null;
global.gc();
process.memoryUsage(); // heapUsed: 3MB左右
```

**weakMap**

```js
process.memoryUsage(); // heapUsed: 3MB左右
const vm = new WeakMap();

let key = new Array(5 * 1024 * 1024);
process.memoryUsage(); // heapUsed: 44MB左右
vm.set(key, 1);
global.gc();
process.memoryUsage(); // heapUsed: 44MB左右

// 这里把key设置为null了之后，我在测了一下memory
key = null;
process.memoryUsage(); // heapUsed: 88MB左右

global.gc();
process.memoryUsage(); // heapUsed: 3MB左右
```

抛开令人疑惑的`key = null`没有垃圾回收前，内存变大的问题。
我们发现通过使用WeakMap可以更方便的释放一个内存。

### 总结

> 总结这个弱引用的特性，就是 WeakMaps 保持了对**键名所引用的对象的弱引用**，即垃圾回收机制不将该引用考虑在内。只要所引用的对象的其他引用都被清除，垃圾回收机制就会释放该对象所占用的内存。也就是说，一旦不再需要，WeakMap 里面的**键名对象**和所对应的**键值对**会自动消失，不用手动删除引用。

那我来实验下，对键值是否是这样表现的。
```js
process.memoryUsage() // 3MB左右
let key = new Array(5 * 1024 * 1024);
process.memoryUsage() // 44MB左右

let wm = new WeakMap();
wm.set(key, key);

key = null;
process.memoryUsage() // 44MB左右，这里没有内存使用翻倍的情况了。

global.gc() 
process.memoryUsage() // 3MB左右
```

这次对比，将key引用的数组作为键值对中的value
1. 先`key = null`
2. 再调用`global.gc`观察是否释放了key引用的数组。
```js
process.memoryUsage(); // 3MB左右

let key = new Array(5 * 1024 * 1024);
let key2 = {};

process.memoryUsage(); // 45MB左右

let wm = new WeakMap();
wm.set(key2, key);

key = null;
global.gc();
process.memoryUsage() // 45MB左右

key2 = null;
global.gc();
process.memoryUsage() // 3MB左右
```

你可以看到执行将`key = null`并调用`global.gc`后，内存实际上并没有释放key引用的数组。

再等到将`key2 = null`并调用`global.gc`后，这才释放了key引用的数组。

通过这个例子我们是否可以得出一个结论，WeakMap中的key与value还是有强引用关系的？

### 应用（未验证）

应用方面主要是使用这个弱引用的概念，能减少手动删除对象关联数据的步骤。

1. 在 DOM 对象上保存相关数据

```js
let wm = new WeakMap(), element = document.querySelector(".element");
wm.set(element, "data");

let value = wm.get(elemet);
console.log(value); // data

element.parentNode.removeChild(element);
element = null;
```

2. 数据缓存

```js
const cache = new WeakMap();
function countOwnKeys(obj) {
    if (cache.has(obj)) {
        console.log('Cached');
        return cache.get(obj);
    } else {
        console.log('Computed');
        const count = Object.keys(obj).length;
        cache.set(obj, count);
        return count;
    }
}
```

3. 私有属性

```js
const privateData = new WeakMap();

class Person {
    constructor(name, age) {
        privateData.set(this, { name: name, age: age });
    }

    getName() {
        return privateData.get(this).name;
    }

    getAge() {
        return privateData.get(this).age;
    }
}

export default Person;
```


### 参考链接

[weakMap](https://github.com/mqyqingfeng/Blog/issues/92)