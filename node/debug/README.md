# Debug

我使用的node版本是 v12.13.1 它推荐的命令行识 node inspect 模块
> (node:77382) [DEP0068] DeprecationWarning: `node debug` is deprecated(不推荐). Please use `node inspect` instead.

```
node debug/inspect 模块名     // 启动debug模式

执行顺序
cont/c     //继续执行完 即continue
next/n     //执行到下一句可执行代码(当然会掠过一些函数的声明)

s/step     //进入函数内部
o/out      //立即执行完函数内部的代码

watch('变量名')   //观察表达式或变量的值

setBreakpoint('脚本文件名',行数)  //省略第一个 代表当前正在运行的脚本
clearBreakpoint(filename , line)  // 简称cb

```

emm，好多 虽然很重要 但还是马住下次在看 p62 node.js权威指南