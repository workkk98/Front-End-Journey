# 函数

函数声明和函数表达式都可以。

### 推断类型

> 尝试这个例子的时候，你会发现如果你在赋值语句的一边指定了类型但是另一边没有类型的话，TypeScript编译器会自动识别出类型：

```js
// myAdd has the full function type
let myAdd = function(x: number, y: number): number { return x + y; };

// The parameters `x` and `y` have the type number
let myAdd: (baseValue: number, increment: number) => number =
    function(x, y) { return x + y; };
```

### 可选参数和默认参数

**TypeScript里的每个函数参数都是必须的。** 这不是指不能传递 null或undefined作为参数，而是说编译器检查用户是否为每个参数都传入了值。 编译器还会假设只有这些参数会被传递进函数。 简短地说，传递给一个函数的参数个数必须与函数期望的参数个数一致。

> * 相同点：默认，可选参数都可以省略参数。
  * 不同点：可选参数必须要放最后一个（这也是因为语法分析的时候，方便赋值变量吧）

### 剩余参数

当你不知道入参有多少个，你就可以使用这个剩余参数，将剩下的参数统一到一个数组里。
原理实际上就是从arguments对象中拿数据。
```js
function rest() {
    var rest = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        rest[_i] = arguments[_i];
    }
    return rest;
}
```

### this参数

具体看this.ts的例子。

this参数可以告诉编译器，这个函数的上下文是某个对象。
> 使用方法：显示提供一个this参数，它出现在参数列表的最前面。

### 重载

> 为了让编译器能够选择正确的检查类型，它与JavaScript里的处理流程相似。 它查找重载列表，尝试使用第一个重载定义。 如果匹配的话就使用这个。 因此，在定义重载的时候，一定要把最精确的定义放在最前面。

