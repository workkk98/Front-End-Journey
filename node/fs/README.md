# fs模块

> 文件的读写一直是一块很重要的内容
> \[mode] 一般指读写删的权利 0777 意思是任何人可以随意操作文件 0是开头必需
> 1 + 2 + 4
> atime = access time mtime = modify time , ctime = create time

#### 读文件

```
fs.readFile( file , [options] , callback )
fs.readFileSync( file , [options] )
```

这两个函数的区别就在于 Sync 是否是同步
那一般同步读文件只用在项目的启动环节(node.js 非阻塞IO才是它的魅力吧)

file可以是 url 也可以是 buffer
options 可以是 对象 例如 :
```
{
  flag: 'r',
  encoding: ''
}
```
但也可以指定一个具体编码格式: readFile( file , 'utf-8' , callback)

返回的值一般是字符串或是buffer


#### 写文件

```
fs.write(url , data , [options] , callback)

```

#### 打开文件和操作文件

```
fs.open(filename , flags , [mode] , callback)
function callback(err ,fd) {
  // fd是文件描述符
}
const fd = fs.openSync(filename , flags , [mode])

// fd即上面打开文件的描述符

// 读出 从文件放到buffer中
// 以下均是字节单位byte offset指 写入缓存区的偏移位置 length指 文件读取的长度 position指文件的位置
fs.read( fd , buffer , offset , length , position ,callback )
// 返回读取的有效字节数
bytesRead = fs.readSync( fd , buffer , offset , length , position )

// 写入 把buffer中的内容写入文件中
// offset 指 从缓存区读取的位置 length 指缓存区读取的字节 position 文件写入的位置
fs.write( fd , buffer , offset , length , postion , callback )

```

**尤其要注意在操作文件内部时，参数的描述**
具体看上面代码的描述:point_up:

**fs.fsync() 和 fs.fsyncSync**
当操作系统将buffer先读到内存，再写入文件中。
但是关闭文件时不一定完成把缓冲层写入文件，所以得使用这个函数完成把剩余数据全部写入文件

#### 操作目录

**fs.mkdir(path , callback)**

**fs.readdir(path , callback)**

#### 操作文件或文件夹状态

**fs.stat() / fs.lstate**

查看文件的信息

**fs.exists(path , callback)**

**fs.rename(oldpath , newpath , callback)**

**fs.watchFile(path , \[options] , function (curr , prev) )**

有趣的是 使用该函数， 运行监听文件的服务。或许这就跟热编译有关吧。
curr 和 prev很好理解 就是当前的 stat 和 之前的stat对象

**fs.watch()**
这个更棒



#### 文件流

忽略sync方法
```
fs.writeFile()
fs.readFile()


fs.write()
fs.read()
```

writeFile和readFile方法，从字面意思上，node.js在操作这个方法时，把文件内容
当作一个整体 一次性放入缓存区。在这期间node.js不能做另外的操作。

在处理read和write方法时，node.js会这样做
1. 把部分内容写到缓存区
2. 等待缓存区写满后，在将缓存区内容写到文件中
3. 重复1和2的操作

在读写的过程中,node.js能执行其他的操作。我们在操作文件时 有时候往往只关心文件的某个部分的数据，
以及在读取到这些数据的操作。
因此引出文件流的概念。
流，在一个应用程序中，流是一组有序的，有起点和终点的字节数据的传输手段。

这些对象都继承**EventEmmiter**
实现了stream.Readable接口的部分对象有：
1. fs.ReadStream
2. http.IncomingMessage (http.createServe()中的request对象 ， 或是 http.request()的response)
3. net.Socket

部分事件
data,end事件(我在 http.IncomingMessage中经常用到)

方法
pause() , resume()

实现了stream.Writeable接口的部分对象有：
1. fs.writeStream
2. http.clientRequest
3. http.clientResponse
4. net.socket

事件
**drain**
当用于写入数据的write方法返回是false之后触发(不是 立马发生),表示操作系统缓存
区中的数据已全部输出到目标对象中，可以继续向系统缓存区中写入数据
finish(end函数被调用后)

方法有
write() , end()


#### fs.createReadStream(path , [options])
```
options = {
  flags,
  encoding,
  autoClose,
  start, (开始读取位置 字节单位)
  end
}
```

#### fs.createWriteStream(path , [options])

fs.createWriteStream(path , \[options]) 返回一个WriteStream对象
假设名叫 writeable
writeable.write(chunk , \[encoding] , \[callback]) 返回一个boolean对象，代表系统缓存区是否被占满
chunk为字符串时，encoding将对字符串以某种格式编码写入文件
writealbe.end(chunk, \[encoding] , \[callback])
**迫使缓存区的内容写入文件，以及追加的内容**，并关闭文件
writeable.bytesWritten 已写入字节数


**node p117开始 值得一看**
另外值得一提的是，
Node.js是这样操作流文件的 文件1 和 文件2 分别代表 读文件 和 写文件 (非flowing模式?)
1. 把文件1的内容先填满系统缓存中
2. 把系统缓存中的内容写入文件，同时把文件中剩余的内容读取到内存中，此时的writeable.write() 返回false
意味着 系统缓存已满
3. 等待系统缓存中的所有内容被写入文件中时 ， 触发writeable对象的drain事件
4. 把内存中的数据写到系统缓存中，然后读取文件的剩余数据并填入缓存区，一直到填满为止
5. 重复操作2-4，一直到文件被读取完。






