# 函数式编程FP（Functional Programming)

特性：

- 纯粹性：纯函数不改变除当前作用域意外的值。

```js
// 反面示例
let a = 0
const add = (b) => a = a + b // 两次 add(1) 结果不一致

// 正确示例
const add = (a, b) => a + b
```

- 数据不可变性：Immutable

反面实例中arr长度变化了。
```js
// 反面示例
const arr = [1, 2]
const arrAdd = (value) => {
  arr.push(value)
  return arr
}

arrAdd(3) // [1, 2, 3]
arrAdd(3) // [1, 2, 3, 3]

// 正面示例
const arr = [1, 2]
const arrAdd = (value) => {
  return arr.concat(value)
}

arrAdd(3) // [1, 2, 3]
arrAdd(3) // [1, 2, 3]
```


##### 一些函数

1. 函数柯里化：将一个多参数的函数转换成一系列只有一个参数的函数。
2. 偏函数：将多个参数的函数转换成两部分。（一定要是两个部分吗)
3. 组合：函数之间能组合。


### 范畴论（Category Theory）

#### 一些概念
- 范畴: 范畴就是使用箭头连接的物体的结构。（In mathematics, a category is an algebraic structure that comprises "objects" that are linked by "arrows". ）
- 箭头表示范畴成员之间的关系，正式的名称叫做"态射"(morphism)。范畴论认为，**同一个范畴的所有成员**，就是不同状态的"变形"（transformation）。通过"态射"，一个成员可以变形成另一个成员。

> 本质上，函数式编程只是范畴论的运算方法，跟数理逻辑、微积分、行列式是同一类东西，都是数学方法，只是碰巧它能用来写程序。所以，你明白了吗，为什么函数式编程要求函数必须是纯的，不能有副作用？因为它是一种**数学运算**，原始目的就是求值，不做其他事情，否则就无法满足函数运算法则了。

### 函数的合成与柯里化

函数式编程有两个最基本的运算：合成和柯里化。

#### 函数的合成

> 如果一个值要经过多个函数，才能变成另外一个值，就可以把所有中间步骤合并成一个函数，这叫做"函数的合成"（compose）。

```
  f()  g()
X -> Y -> Z
```
例如上面的简单代码块，y=f(x), z = g(y), 那其实我们可以转换成z = g(f(x));
那么x和z的关系就是g·f。
合成必须要满足函数的结合律。

#### 柯里化

前面提到了f(x)和g(x)合成一个函数。但我们得注意到，这两个函数入参都是只有一个，万一这两个函数的入参一个是2个，一个是3个呢？

通过柯里化函数，我们就可以把函数转换成一系列的一个参数。

### 函子

刚刚我们提到的是一个范畴内的转变，那不同的范畴之间互相转变，就涉及到了函子(Functor)

> 函子是函数式编程里面最重要的数据类型，也是基本的运算单位和功能单位。

> 它首先是一种范畴，也就是说，是一个容器，包含了值和变形关系。**比较特殊的是，它的变形关系 可以依次作用于每一个值，将当前容器变形成另一个容器。**

#### 函子的代码实现

任何具有map方法的数据结构，都可以当作函子的实现。
```js
class Functor {
  constructor(val) { 
    this.val = val; 
  }

  map(f) {
    return new Functor(f(this.val));
  }
}
```

> 一般约定，函子的标志就是容器具有map方法。该方法将容器里面的每一个值，映射到另一个容器。

### of 方法

> 函数式编程一般约定，函子有一个of方法，用来生成新的容器。

```js
Functor.of = function(val) {
  return new Functor(val);
};

Functor.of(2).map(function (two) {
  return two + 2;
});
// Functor(4)
```

### Maybe函子