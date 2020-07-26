# TS的模块

ts的模块导入导出和ES6的很相似。

### export default

重新复习了下export default的实质，实际上default就是个变量名。
然后在整个模块导出过程中，可以有default接口，还有其他接口

```ts
// 文件a
export {
  default,
  a,
  b
}

// 文件b
import defaultFun, { a, b } from './a.ts'
```

然后从上面的源码也可以看出，导入的过程中，default变量和其他变量是有区别的，它是不被包括在解析括号内的。

因为前面提到default实质是个变量名，所以会有以下特性。

```ts
// 导出匿名函数
export default function () {}

// 不可以声明变量时使用default
export default var a = 3;
```

因为使用default的本质就是把后面的变量赋值给default，可能设计者觉得这样重复赋值很蠢。

> 就比如上面的例子， a = 3;  default = a;
