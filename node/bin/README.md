# npm脚本命令

> npm 脚本的原理非常简单。每当执行npm run，就会自动新建一个 Shell文件，在这个 Shell 里面执行指定的脚本命令。因此，只要是 Shell（一般是 Bash）可以运行的命令，就可以写在 npm 脚本里面。
> 比较特别的是，npm run新建的这个 Shell，会将当前目录的node_modules/.bin子目录加入PATH变量，执行结束后，再将PATH变量恢复原样。

# shebang

shebang = #! 

作用: 指定脚本的执行程序

例如:
```shell
#! /usr/bin/env node
console.log('hello world')
```