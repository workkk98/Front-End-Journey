#### await遇到一个会变reject的promise实例 该如何处理

假如说一个promise状态变成reject我们应该怎么处理？

```
async function request () {
  await promiseInstance
}
```

我们可以先记结论，等promise状态变为reject后，继续执行函数，但此时 await变成了 throw 

```
reject('error')
//回到request函数中
throw 'error'
```

因为此时，没有try-catch捕获throw问题的话，会导致下面的原因
1. 导致函数无法执行下去
2. async函数返回的promise状态 永远都是 pending

所以 如果是使用了await promise语法 尽可能的使用try-catch