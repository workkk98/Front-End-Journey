# 2020年4月 周4

#### 原生实现文件上传

前端通过input flie元素, 获取元素后监听change事件

change事件 和 input的区别， 前者必须修改原先值，后者则是有输入就会触发。

HTML5提供了元素的files接口，这个接口是FileList类的实例。原型有symbol.iteerator接口

接口中有着file对象，获取到对象后

1. 实例化一个new FormData()对象   form
2. form.append(name, value) value就是这个file对象即可

最后通过ajax上传form。但要注意的是 这个文件上传的类型是 Content-Type: mutipart/form-data

后端方面

通过监听流，写入文件然后移动文件到对应文件夹即可。

#### js对象属性的顺序问题

*好文*
[对象属性顺序](https://juejin.im/post/5c88ce0e5188257f882f0ef8)
[内部顺序](https://www.stefanjudis.com/today-i-learned/property-order-is-predictable-in-javascript-objects-since-es2015/)

```js
var a = {
  '0.1': '0.1',
  a: 'a',
  b: 'b',
  1: 1
}

Object.keys(a) // ["1", "0.1", "a", "b"]
```

结果说明，最后打印的顺序与声明先后的顺序并没有关系。

**另外Object.keys[] 和 for in的输出顺序相同。这个顺序是基于浏览器的实现**

> Object.keys() returns an array whose elements are strings corresponding to the enumerable properties found directly upon object. The ordering of the properties is the same as that given by looping over the properties of the object manually.



我从文章得知，JavaScript内部有一个ownPropertyKeys方法，它定义了对象属性遍历的顺序。
而Object.getOwnPropertyNames()这个静态方法基于这个ownPropertyKeys方法。保证了遍历的顺序。

> 1. integer-like keys in ascending order
  2. normal keys in insertion order
  3. Symbols in insertion order
  4. if mixed, order: interger-like, normal keys, Symbols

* 数字类型的升序
* 正常类型的键名根据添加的顺序，例如 a: 'a'这样子的 符合命名规范的
* symbol类型的根据添加的顺序
* 如果是混合的，按照这个顺序: 像数字的，像普通键名的，像symbols类型的 **这个指得是，对象内有这三种类型的属性的话**

```js
a = {
  '0.1': '0.1',
  b: 'b',
  a: 'a',
  1: 1,
  [Symbol('a')]: Symbol('a'),
  '01': '01',
  '01ab': '01ab'  
}
// 0.1: "0.1"
// 01: "01"
// 01ab: "01ab"
// 1: 1
// a: "a"
// b: "b"
// Symbol(a): Symbol(a)
```

值得一提的是，像'01', '01ab'这些键名 属于interger-like类型

所以比较对象，不能通过使用类似Object.keys()的方法。主要因为你不能保证对象的属性的添加顺序。
而且遍历基于什么标准你也不能保证

```js
a = {a:'a', b: 'b'}
b = {b: 'b', a: 'a'}

Object.keys(a)
// ["a", "b"]
Object.keys(b)
//["b", "a"]
```

这个对象a 和 b从实际意义上明显是相等的， 但是a和b对象key输出顺序由于添加顺序的不同而不同.

#### 实现一个自动适应高度的textarea

textarea是个行级元素。一般都会给他设定一个固定的宽度和高度，当用户输入的文本超过这个高度的时候，会出现滚轮然后滚动到新的一行。这在我看来是比较落后的一个控件。现在流行的控件都是自动适应高度的输入框，即用户输入的文本超过高度后，输入框自动变高。


**修改textarea的高度**
实现思路: 当文本超过textarea的高度时，通过更改textarea的高度,达到想要的效果。

```html
<div>
  <span></span>
  <textarea></textarea>
</div>
```

像input类的控件，用户键入的文本都储存在节点的value属性上(elment继承Node)
通过把textarea中的value同步到一个占位元素span， 文本有多高，span就有多高，同理textarea也是相同的高度。

如何把span的高度同步到textarea上面？
可以通过一个父容器，因为span撑开了父容器。把textarea设置成与父容器等高等宽即可，这使得textarea就自动撑开了
把textarea的父元素div的position属性设置成realtive, 然后textarea position: absolute

这三者的层叠关系从上到下  textarea -> span -> div(这里我们也可以知道 用户看到的都是textarea内容)

**一些细节**

textarea通过占位元素改变高度，所以这两者的字体大小得相同。

另外， span遇到换行符\n不会自动换行，所以得设置 css属性 white-space: pre-wrap;(这个我得去看看，忘记掉了具体用途)

#### HMR和热重载不同

HMR是 Hot Module ReplaceMent，直译的意思是 模块热替换。指部分模块会替换。我对HMR的了解还是比较少的后面得去花些时间去看下。

而热重载是整个项目的重新运行。

#### require.context()

[require.context](https://webpack.js.org/guides/dependency-management/#context-module-api)
```js
const requireContext = require.context(directory, useSubdirectories = true, regExp = /^\.\/.*$/, mode = 'sync');
```

第一个参数: 目录地址
第二个参数: 是否使用子目录，即是否搜索子目录里文件
第三个参数: 文件后缀名匹配模式
第四个参数: 模式

require.context()方法返回一个function, 这个函数需要一个参数request.

假设requireContext变量指向这个函数function, 函数有以下三个属性

>> The exported function has 3 properties: resolve, keys, id.

resolve is a function and returns the module id of the parsed request.
keys is a function that returns an array of all possible requests that the context module can handle.

requireContext.keys() 返回一个数组，数组包含可能的请求路径

那这个API就提供我们能快速的引入一个目录下的内容，而不用去繁琐一个个的写需要引入的内容。