# source-map

示例：本文件夹的index.html文件，代码位置有点偏移但是基本上是有那味了。
> source-map是一个信息文件，里面存储着位置信息。也就是说，转换后的代码的每一个位置，所对应的转换前的位置。

### 启用Source map

在转换后的代码上加这一行。
```js
//@ sourceMappingURL=/path/to/file.js.map
```

### 生成source map

1. Google的Closure编译器(在demo文件夹里就有)

```s
　　java -jar compiler.jar \
　　　　--js script.js \
　　　　--create_source_map ./script-min.js.map \
　　　　--source_map_format=V3 \
　　　　--js_output_file script-min.js
```
对应的解释
　　- js： 转换前的代码文件
　　- create_source_map： 生成的source map文件
　　- source_map_format：source map的版本，目前一律采用V3。
　　- js_output_file： 转换后的代码文件。

可以看到map文件实际上就是映射文件，指明了压缩文件代码在未压缩文件中的具体位置。

### map文件具体长啥样

```json
{
  "version": 3, // Source map的版本，目前为3。 
  "file": "out.js",  // 转换后的文件名
  "sourceRoot": "",  // 转换前文件的目录
  "sources": ["foo.js", "bar.js"], // 转换前的文件，该项是个数组，因为可能是多个文件合并输出成一个压缩文件
  "names": ["src", "maps", "are", "fun"], // 转换前的所有变量和属性名
  "mappings": "AAgBC,SAAQ,CAAEA" // 记录位置信息的字符串，下文详细介绍。
}
```

### mappings属性如何用的

首先这是一个很长的字符串，它分成三层。
* 第一个是层，通过分号`;`表示，第一个分号前面的就是第一行，以此类推
* 位置对应，以逗号`,`表示，每个逗号对应转换后文件的一个位置。所以，第一个逗号前的内容，就对应该行源码的第一个位置，以此类推。
* 位置转换，以[**VLQ编码**](https://en.wikipedia.org/wiki/Variable-length_quantity)表示，代表该位置的转换前的源码位置

所以在这个例子里。
`"mappings": "AAAAA,BBBBB;CCCCC"`
这就告诉我们，压缩后的代码有两行（有一个分号），第一行有两个位置（有一个逗号），第二行有一个位置

**位置转换**
那第一行第一个位置的`AAAAA`字符指向的是转换前文件的哪个位置？

- 第一位，表示这个位置在（转换后的代码的）的第几列。
- 第二位，表示这个位置属于sources属性中的哪一个文件。
- 第三位，表示这个位置属于转换前代码的第几行。
- 第四位，表示这个位置属于转换前代码的第几列。
- 第五位，表示这个位置属于names属性中的哪一个变量。(不是必须的，如果该位置没有对应names属性里的变量)

在VLQ编码中，0是基数，字符A对应的就是0

可以看到mappings属性里通过分号，逗号表示行和位置（不是列），列则是通过对应的值的第一个字母来表示。
为什么这样设计？
> 我猜是，因为js文件很多都被压缩成一行了，没必要每行每列都要有对应的源码位置。所以就是那每行几个特殊位置，才是最重要的。
> 如果用列，那可想而知这个map文件会很大了，因为每个列都要一个逗号。