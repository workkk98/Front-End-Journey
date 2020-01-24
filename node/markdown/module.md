# modules

####  require函数
require() 参数可以是以下几个内容 (区别在于是否是第三方的模块)
* 携带路径的文件名或目录名
* 不带路径的文件名或目录名


第二种其实在开发中应该是用的最多的，引用模块
require函数内部会通过 一个检索规则，本目录的node_modules 一层层往上找 
如果没有找到则报错
假设参数是目录名 例如require('foo')
他就有可能按照这样的步骤搜索
1. foo/package.json
2. foo/index.js
3. foo/index.json
4. foo/index.node (二进制文件)

具体可以看/commonJS/require.js
你会发现 事实上 当文件名和目录名 对应的查找顺序也非常合理
因为如果入参 是 文件名那肯定只需要换后缀
如果入参 是 目录名，那检索的肯定是不同格式的index的文件


#### 模块对象的属性

这里就暂时略过了
node.js权威指南 pdf p77

#### 包与npm包管理工具

刚刚有提到 不携带路径的参数 在node_modules的目录下寻找对应的模块,下面是一些格式
例如require('foo') /node_modules/foo/ 这个为根目录
* /package.json
* /bin bin文件夹中存放二进制文件
* /lib javascript文件
* /doc 文档
* /test 包的单元测试

package.json文件
```
  name: 包名。由小写字母，数字，下划线组成 不含空格,
  preferglobal: 是否全局安装,
  main: 主模块位置,
  // 书p65 pdf p78
```


#### npm的一些命令行

npm search (包名)


npm root -g
全局包的安装路径

npm config set prefix "d:\node"
修改全局npm包的安装路径

npm list (-g)
查看当前或全局目录下的包

npm uninstall 包名 (-g)
卸载当前目录或全局目录下的包

npm update 包名 (-g)
更新当前目录或全局目录下的包