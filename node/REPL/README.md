#### REPL(Read-Eval-Print-Loop)
这个名字挺有意思的。中文翻译叫交互式运行环境。实际上 ， 工作原理我认为是读取命令行，
使用eval()评估，打印结果。然后一直循环下去

使用方法
```
$ node // 进入环境
$ .exit // 退出环境(不知道为什么 提示我ctrl+C 我也知道这是退出进程的通用方法 但是在这里无效) 
后言： 原来是两次^C 或者^D也可用
```

**REPL 上下文 **
/node/REPL/context_test.js
```
var repl = require('repl');
var con = repl.start().context; //注意这里start函数
con.msg = "example message"
con.foo = function () {
  console.log(con.msg)
}

// 在命令行中 输入
// > msg // 打印出 "example message"
// > foo() // 打印出 example message /n undefined
```

通过上下文对象，可像访问全局变量访问上下文中的内容