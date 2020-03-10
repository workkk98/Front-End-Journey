# generator

#### 语法上

gen函数返回一个遍历器对象

对象有next(), throw(), return()方法
实际上他们都使gen函数继续执行，但区别就在于如何执行

引自，<<阮一峰ES6>>

```
const g = function* (x, y) {
  let result = yield x + y;
  return result;
};

const gen = g(1, 2);
gen.next(); // Object {value: 3, done: false}

gen.next(1); // Object {value: 1, done: true}
// 相当于将 let result = yield x + y
// 替换成 let result = 1;

gen.throw(new Error('出错了')); // Uncaught Error: 出错了
// 相当于将 let result = yield x + y
// 替换成 let result = throw(new Error('出错了'));

gen.return(2); // Object {value: 2, done: true}
// 相当于将 let result = yield x + y
// 替换成 let result = return 2;

```

**yield\***

> yeild* 其实 就等价于 for of接口 + yield语句

实际上就是把 后面的具有 \[Symbol.iterator]接口的内容展开了
例如
```
function* foo() {
    yield 'c';
    yield 'd';
    return 'e'
}

function* bar() {
    yield 'x';
    yield* foo()
    yield 'y';
}

//等价于

function* bar() {
    yield 'x';
    yield 'c';
    yield 'd';
    yield 'y';
}

// 又或者可以这么写

function* bar() {
    yield 'x';
    for(let i of foo()) {
      yield i
    }
    yield 'y';
}


```

#### 函数体内外的数据交换


#### 错误处理机制

具体看 throw.js。

gen函数返回的遍历对象，调用对象的throw() 可以捕获函数体外抛出的错误。

```
function * demoWithTC (x) {
  console.log('执行顺序')
  let y
  try {
    y = yield x << 1
  } catch (e) {
    console.log(e)
  }
  console.log(y)
  yield 'throw在哪个位置停止'
  return x
}

let iterator = demoWithTC(2)
console.log(iterator.next())
console.log(iterator.throw('an error'))
console.log(iterator.next())

```
最后打印结果是
> 执行顺序
  { value: 4, done: false }
  an error
  undefined
  { value: 'throw在哪个位置停止', done: false }
  { value: 2, done: true }

从 an error 一直到 { value: 'throw在哪个位置停止', done: false} 这是 iterator.throw()执行的结果

我们在这里也就可以下结论，调用throw(arg) 方法后,下面是伪代码

```
// 相当于在 停止的yield地方
yield => throw arg
// 执行到下一个yield
yield xxx
// 并返回内容xxx
```