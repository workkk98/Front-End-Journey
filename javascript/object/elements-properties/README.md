# 对象下标

从ts的类型中我们可以看到，下标的类型有number、string、symbol。
参照 JavaScript 定义规范中的描述，属性名恒为字符串，即使你使用了某个非字符串的名字，也会隐式地转化为字符串类型。（挖个坑后续自己看下规范）

### 第一个问题

js对象的遍历顺序（在V8中）是怎样的？

先说结论：

1. 数值类型下标index（又称elements）的按照数值的大小顺序排列
2. 字符串类型下标index（又称named properties）的按照先后加入的顺序排列。

### elements和properties

elements和properties存在两个单独的数据结构中，这样在不同使用模式下添加/访问 properties 和 elements 会更加有效。

具名properties以类似的方式存在单独的数组中。但与elements不同，我们不能简单地用 key 来推断它们在 properties 数组中的位置，我们需要一些其他元数据。在 V8 中，每个 JavaScript 对象都会关联一个隐藏类。**隐藏类**存放了有关对象特征的信息，除此之外，**还存放了 properties 名字 对应 properties 数组 index 的 map**。为了使事情复杂化，有时我们使用字典而不是简单数组来表示 properties。我们将在专用部分中对此进行详细说明。

### 隐藏类（HiddenClasses）和描述符数组（DescriptorArrays）



### 参考链接

[[译] V8中的快属性](https://zhuanlan.zhihu.com/p/287894979)