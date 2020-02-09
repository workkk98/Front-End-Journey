# entry

这个属性是必须的

entry值的属性可以是 string ， array ， object

这恰好和**chunk**的名字相关
* 如果 entry 是一个 string 或 array? ，就只会生成一个 Chunk ，这时 Chunk 的名 称是 main 。
* 如果 entry 是一个 object ，就可能会出现多个 Chunk ，这时 Chunk 的名称是 object 键值对中键的名称。

entry还可以使用同步或异步函数  ，如果有大量入口的话

#### context

Webpack 在**寻找相对路径的文件时会以 context 为根目录**， context 默认为执行启动 Webpack 时所在的当前工作目录。
context必须是一个绝对路径的字符串 。也就是说 如果文件使用相对路径，得依赖context的值

```
context: '绝对路径'
```

# output

#### filename

假如entry只是一个 就直接是chunk的名字。如果输出多个文件使用模版和变量。
每个出口对应的chunk含有4个变量
* id chunk唯一的id
* name 对应模块名
* hash  Hash: cced66cfa7f98a2878de 构建这次的hash值
* chunkhash chunk内容的hash