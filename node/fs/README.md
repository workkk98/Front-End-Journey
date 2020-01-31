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

**fs.watch(path , \[options] , function (curr , prev) )**

有趣的是 使用该函数， 运行监听文件的服务。或许这就跟热编译有关吧。
curr 和 prev很好理解 就是当前的 stat 和 之前的stat对象

