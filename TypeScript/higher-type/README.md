# 高级类型

高级类型值得反复学习.

### 交叉类型(Intersection Types)

> 交叉类型是将多个类型**合并为一个类型**。 这让我们可以把现有的多种类型叠加到一起成为一种类型，它包含了所需的所有类型的特性。

ps: 交叉感觉是两条路回合到一起，所以是合集。

### 联合类型(Union Types)

联合类型用一个`|`即可。(操作符号里，这个|代表着或操作符)
```ts
function padLeft(value: string, padding: string | number) {
    // ...
}
```

ps: 联合感觉是多个类型的可能，可能是A也可能是B。

### 类型保护与区分类型（Type Guards and Differentiating Types）

当我们知道有些地方是个确切的类型，但不想多次使用类型断言，就可以使用类型保护这种语法。

> 类型保护与区分类型（Type Guards and Differentiating Types）

1. 使用类型保护函数
2. typeof
3. instanceof

### 类型别名

它就是一个类型的引用。
> 类型别名有时和接口很像，但是可以作用于原始值，联合类型，元组以及其它任何你需要手写的类型。

type可以配合高阶类型的使用，例如交叉类型，联合类型等。

* 和interface的区别

我觉得最重要的一点就是，type是个**类型别名**，它就是引用某个类型。而interface是实际的一个类型，描述对象的形状。

1. 接口创建了一个新的名字，可以在其它任何地方使用。 类型别名并不创建新名字—比如，错误信息就不会使用别名。 **在下面的示例代码里，在编译器中将鼠标悬停在 interfaced上，显示它返回的是 Interface，但悬停在 aliased上时，显示的却是对象字面量类型。**

```ts
type Alias = { num: number }
interface Interface {
    num: number;
}
declare function aliased(arg: Alias): Alias;
declare function interfaced(arg: Interface): Interface;
```

2. 重要区别是类型别名(它是个引用)不能被 extends和 implements（自己也不能 extends和 implements其它类型）。 因为 **软件中的对象应该对于扩展是开放的，但是对于修改是封闭的**，你应该尽量去使用接口代替类型别名。

3. 如果你无法通过**接口来描述一个类型**并且需要使用联合类型或元组类型，这时通常会使用类型别名。

### 索引类型

> 使用索引类型，编译器就能够检查使用了动态属性名的代码。 例如，一个常见的JavaScript模式是从对象中选取属性的子集。

结合泛型，ts这里引出了几个新的类型操作符。

* keyof T 索引类型查询操作符。返回的结果是`T`上已知的公共属性名的**联合类型**。

```ts
// 用法

interface Person {
    name: string;
    age: number;
}
let personProps: keyof Person;
```

### 映射类型

当你想把一个接口里的属性全部转换成可选，或是只读的版本。

这里使用了`in`操作符。

```ts
type Keys = 'option1' | 'option2';
type Flags = { [K in Keys]: boolean };
```

1. 类型变量 K，它会依次绑定到每个属性。
2. 字符串字面量联合的 Keys，它包含了要迭代的属性名的集合。
3. 属性的结果类型。

> ts提供的高阶类型：`ReadOnly`、`Partial`、`Pick`、`Record`

这些高阶类型的目的似乎是为了更快的帮助开发者构建新的类型。但在与泛型结合方面，仍需要再学习一下。