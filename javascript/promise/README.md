# promise

node/modules里有promise源码
下面记录一些它的字段的用途

promise = {
  _h: 指这个promise跟的then有几个
  _i : 状态 pending ， onfullfilled ， onrejected,
  _j : newValue 通过resolve(newValue) return newValue
  _k : Handler对象 有 成功和失败的回调 有下一个promise对象
}

### promise.all()

入参是一个iterable类型（就是实现了[Symbol.iterator]方法的对象）
promiseAll返回的promise对象自然也有fullfilled和rejected状态。
条件是：

1. fufilled：所有的promise都完成了
2. reject：但凡其中有一个promise失败了，都变成reject，并返回第一个


### promise.any

这个是promise.all的反例，如果有一个promise成功了则立即返回它。


### promise.allSettled()

有种情况，你希望所有的promise都完成或失败了，你想知道所有的完成情况，就可以用这个API。

> 值得注意的是因为不管是成功或失败的promise的结果都会在返回的数组中，所以包装了下这个结果

```js

// 成功的
{
  status: 'fulfilled',
  value: value
}

// 失败的
{
  status: 'rejected',
  reason: reason
}
```

### promise.race()

race从名称就能略知一二，实际上就是iterable对象中的每个元素但凡fullfilled，或reject了。返回这第一个promise。