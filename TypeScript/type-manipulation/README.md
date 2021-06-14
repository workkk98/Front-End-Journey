# type manipulation（类型操作符）

我的理解，这些类型操作符始终是为了用户能快速的写出自己定义的类型。

### 条件类型（condition Type)

条件类型的格式类似于JS中的三元运算符。条件类型真正能发挥作用的地方在于泛型（generics）。

**Distributive Conditional Types(分布式条件类型)**

> When conditional types act on a generic type, they become distributive when given a union type. For example, take the following

这个意思就是说如果泛型是一个联合类型，条件类型操作符就变成了分布式条件类型。
它的原理就是遍历union类型，每个类型都执行一次条件类型（我是这么理解的）并合并。这个其实可以验证，比如说`./condition-type`文件中的验证分布类型的原理例子
来看个例子：

```ts
type ToArray<Type> = Type extends any ? Type[] : never;

// StrArrOrNumArr = string[] | number[]
type StrArrOrNumArr = ToArray<string | number>;
type StrOrNumArr = ToArrNonDist<string | number>;
```

但你不想有这种行为，可以通过对extends两边的关键词用方括号包裹起来(square brackets)

### 