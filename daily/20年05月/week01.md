# 20年5月周记 1

#### pow(x, n)

实现一个计算x的N次方的函数。

如果是直接模拟计算过程，那时间复杂度是O(n)。从x -> x^2 -> ... -> x^n

结合数学 和 二分思想，我们知道 x^n = x^n/2 * x^n/2

问题就转换成了求x^n/2。 所以通过递归即可求的x^n的结果 时间复杂度是O(logn)

这个时间复杂度可以画一个函数运算二叉树的图，n * (1/2)^k = 1 所以k = logn

值得一提的是如果n < 0, 实际上求 (1/x)^n次方即可

#### TS类型声明

```ts
const nullVal: null = null
const undefVal: undefined = undefined

const name: string|number = 'workkk'
```

基础类型里这两个类的声明得注意下。还有就是联合类型

interface得注意下，这个规范了对象的形状(shape)

```ts
interface Person {
  name: string
  age: number
  job?: string
  [propName: string]: any
  readonly id: number
}
```

另外interface里有三个特殊属性，分别是
* 可选属性: 如同其名
* 任意属性: 值接口里所有属性对应value都是该属性的声明的子类, 也意味着可以随意往对象里增加属性
* 可读属性: 仅在声明时可以赋值

#### TS类型声明2

**数组**

有以下三种类型声明方法

```ts
const arr: number[] = [1, 2, 3]
const arr1: Array<number>
```

第三种就是通过interface，但这种形式表现的更多的是 类数组对象，例如函数作用域中的arguments对象

这里interface,很奇怪的是
```ts
interface args {
  [index: number]: any
}
```

我知道对象的键名有三种形式(前面关于对象遍历的章节写到过)
* like-number
* string
* symbol

我的问题就是，

1. TypeScript在静态检测的时候，可以把键名推断出是number类型的吗？
2. 另外就是 [\]这种在接口里，我目前只看到过在\[propName: string] 也就是任意属性中使用。


**函数**

函数有两种: 函数声明，函数表达式(函数表达式可以通过接口的方式声明类型)

例如这样
```ts
interface sum {
  (a: number, b: number): number
}
```

函数的类型表示上，主要就是注意入参和出参

详细看/TypeScript/start/function.ts

主要有这两点
1. 剩余参数，需要将变量类型声明成数组 例如...left: number[]
2. 函数重载，TS在静态编译时，会选择合适的函数？

#### webworker

webworker在使用的过程中复习了下。主要就是新建一个worker

```js
var worker = new worker('js路径') // 同源
worker.postMessage()
//...
```
worker通过指定js文件地址，加载后执行。worker线程是一个IO堵塞的。


#### TCP滑动窗口

意义就是为了解决TCP如果发一个数据包，接收端返回一个确认应答包，这样的过程效率太低的问题。

窗口大小指的就是一定范围内的数据包，可以在不接受确认应答前就发送。

在重传方面也有一定的作用。

1. 接收端确认应答包丢失了， 但后面的确认应答包告诉发送端已经接收到了前面的数据包。发送端就不需要再次发送了
2. 发送端包丢了，接收端会在后面3次确认应答包中反应这个问题，接收端收到三次后，重新发送丢掉的数据包。值得一提的是，丢失包后面的数据包接收端拿到后，会放在缓冲区。这样避免了发送端再次发重复的数据包。

#### webkit, Gecko渲染引擎是如何工作的？

目前有些难以理解，主要总结下就是把

html先解析成tokens，然后转换成dom树，dom树再经过计算获得渲染树(webkit是这样子的), 最后在调用native GUI 绘制

[howbrowserswork](https://www.html5rocks.com/zh/tutorials/internals/howbrowserswork/#Render_tree_construction)