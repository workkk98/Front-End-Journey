/**
 * require(X) 处理顺序
 * 1. X = 内置模块 例如require('http')
 * 2. X 以路径开头 如./同级目录 /根目录 ../上级目录 
 *   a. x当成文件 寻找 x , x.js , x.json , x.node
 *   b. x等于路径 x/package.json, x/index.js, x/index.json, x/index.node
 * 3. X 不带路径
 *   a. 根据 X 所在的父模块，确定 X 可能的安装目录。
 *   b. 依次在每个目录中，将 X 当成文件名或目录名加载。
 * 4. not found
 */

 const character = require('./export')
 const fs = require('fs')
 console.log(character)


//module源码可以看a.js ,b.js 调用每个模块都是其实都是new Moudle所以是值的拷贝
//每个moudle都有require方法

//require源码实际上简单来讲就是先创建一个以X为路径的module实例，然后按照规则寻找，找到文件后调用fs.readFileSync
//获得文件字符串然后包在立即执行函数中执行