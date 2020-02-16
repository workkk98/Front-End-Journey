# process

> 在Node.js中 ， 用process对象代表Node.js应用程序。该对象是个全局对象，可以在REPL 环境中 或者各种模块
> 中访问它

#### process对象的属性(部分)
* execPath 可执行文件的绝对路径
* argv 数组 也就是一个命令行的参数 例如 $ node app.js 1 2 3 = \[node执行地址 , 文件 , 1 , 2 , 3]
* env 对象 包含了运行Node.js应用程序的操作系统环境的信息
  人们人为定义了process.env.NODE_ENV这个属性 作为是什么环境的变量
  所以我们可以通过设置这个属性来选择打开什么模式
  ```
  这两者似乎挺相同的 区别在于env 可能省略也没关系
  NODE_ENV=development node 

  // bash和zsh设置环境变量的方法
  env API_KEY=123123 node app.js
  // 然后可以查看process.env.NODE_ENV的属性了
```
* config 对象 node.js 配置
* pid 进程ID

#### process的一些方法

1. process.memoryUsage()

返回一个 对象 
{
  rss : 为进程分配的内存
  heapTotal: 给v8分配的内存
  heapUsed: v8已用的
  external: 额外的
}

2. process.nextTick(callback)

用途就是推迟回调函数的执行，在下一个异步方法的函数回调开始执行
比setTimeout(callback , 0) 更快 

比较了下 process.nextTick() => 0.451ms  setTimeout() => 1.154ms

3. abort()

4. chdir()

修改目录

5. cwd()

当前目录

6. exit()

推出运行的进程

7.  uptime()

进程当前时间

17. hrtime()

测试代码断的时间,返回一个数组 第一个是s单位的 第二个是纳秒为单位的

#### 事件

* exit
* uncaughtException
* SIGINT


#### 使用spawn方法开启子进程

使用child_process模块(先略过)