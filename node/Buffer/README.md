# Buffer对象

#### Buffer.from() 取代new Buffer

new Buffer不推荐使用
const buffer = Buffer.from()

#### buffer.write(chunk , offset , length , encoding)

在buffer对象中写入一些东西

#### buffer.copy(targetBuffer , targetStart , sourceStart , sourceEnd)

复制buffer到另一个buffer中

#### Buffer类静态方法

* isBuffer()
* byteLength(string , \[encoding])
* concat(list , \[totalLength])  list: <Buffer []>
* isCoding()

### ArrayBuffer(字节数组)

> 用来表示通用的、固定长度的原始二进制数据缓冲区。

- byteLength: 字节长度
- slice: 返回一个新的 ArrayBuffer ，它的内容是这个 ArrayBuffer 的字节副本，从begin（包括），到end（不包括）

### ArrayBuffer不可读写，所以得用“视图”来读写

首先我们得搞清视图是什么，我们存在ArrayBuffer中的是二进制，当我们读出来的时候，希望以某种格式读取。通过视图这个接口，我们就可以直接操作ArrayBuffer了。

> 视图是一个可以从 二进制ArrayBuffer 对象中读写多种数值类型的**底层接口**，使用它时，不用考虑不同平台的字节序问题。

分以下两个接口：
1. TypedArray：这是一组不同数据类型的接口，统称为TypeArray。
2. DataView：DataView视图提供更多操作选项，而且支持设定字节序(小端机器，大端机器)。

##### TypedArray的9钟视图类型

| 名称 | 占用字节 | 描述 ｜
| :--: | :--: | :--: |
| Int8Array | 1 | 8位有符号整数 |
| Uint8Array（unsigned int） | 1 | 8位无符号整数 | 
| Uint8ClampedArray | 1 | 8位无符号整型固定数组(数值在0~255之间) | 
| Int16Array | 2 | 16位有符号整数 | 
| Uint16Array | 2 | 16位无符号整数 | 
| Int32Array | 4 | 32 位有符号整数 | 
| Uint32Array | 4 | 32 位无符号整数 | 
| Float32Array | 4 | 32 位 IEEE 浮点数 | 
| Float64Array | 8 | 64 位 IEEE 浮点数 | 

值得一提的是有符号整数应该是用的补码?，即-128~127


视图的构造函数接受三个参数，第一个ArrayBuffer对象，第二个视图开始的字节号（默认0），第三个视图结束的字节号（默认直到本段内存区域结束）
接受ArrayBuffer实例作为参数，以指定格式读出二进制数据
可接受普通数组作为参数，直接分配内存生成ArrayBuffer实例，并同时对这段内存进行赋值，再根据这段内存生成视图。
可接受视图做为参数，生成的新数组复制了参数视图的值，生成新的数组和视图。（想基于同一内存生成新视图，需要传入视图.buffer）

### DataView

DataView提供更多操作选项，最重要的是它支持字节序列。inter mac就是一个用小端法表示数字的机器。

### 至于buffer

buffer归根结底也是视图，在引入TypedArray之前，js没有读取或操作二进制数据流的机制。Buffer类是作为nodejs API的一部分引入的，用于在TCP流，文件操作系统，以及上下文中与八位字节流进行交互。

实际上buffer实例，就是Unit8Array实例，但这两者有点小区别，区别就在from函数上。

### 参考链接

https://juejin.cn/post/6844903889364336654#heading-3