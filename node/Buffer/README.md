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