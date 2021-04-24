# import type from xxx

这个语法的由来是因为两个原因：

1. 消除歧义

简单来说就是，单个文件中如果你引用并导出了一个type类型，某些个编译器(transpiler)就会工作不正常。

下面是typescript团队的说法: 

> While you can use TypeScript to produce JavaScript code from TypeScript code, it’s also common to use other transpilers such as Babel to do this. However, other transpilers only operate on a single file at a time, which means they can’t apply code transforms that depend on understanding the full type system. This restriction also applies to TypeScript’s ts.transpileModule API which is used by some build tools.

我的理解是，“转译器”是一次转译单个文件，而不能依赖于整个类型系统去转译代码。

具体的例子可以跑下demo：
  1. tsc index.ts
  2. npm run build:foo
  3. npm run build:foo2

通过例子2和3，可以从输出看到这个原因。

2. typescript的"import elision"会删除那些仅引入了类型的语句

这就导致了用户不得不插入第二条引入语句，确保副作用。

```ts
// This statement will get erased because of import elision.
import { SomeTypeFoo, SomeOtherTypeBar } from "./module-with-side-effects";

// This statement always sticks around.
import "./module-with-side-effects";
```

### isolatedModules配置

通过isolatedModules配置，可以让typescript去警告你。因为你写了一些它不能正确理解的代码。

[例子](https://www.typescriptlang.org/tsconfig#isolatedModules)

这个也是主要是为了帮助babel这些工具吧。

### 使用import type 以及export type语法

可以跑下例子:
`yarn build:type-foo2`

截然不同的是，这次输出是空的。这更加确定语境。

### Type-Only vs Erased

当然import type也导致了一个弊端，"这个语法仅引入了这个类型, 不能当做变量来使用"。

> In TypeScript 3.8 Beta, only the type meaning of a declaration will be imported by import type. That means that you can’t use values even if they’re purely used for type positions (like in the extends clause of a class declared with the declare modifier, and the typeof type operator).

```ts
import type { Base } from "my-library";

let baseConstructor: typeof Base;
//                          ~~~~
// error! 'Base' only refers to a type, but is being used as a value here.

declare class Derived extends Base {
    //                        ~~~~
    // error! 'Base' only refers to a type, but is being used as a value here.
}
```

所以建议这个语句使用在不会影响到周边JavaScript代码的地方。

### 参考链接

[typescript](https://devblogs.microsoft.com/typescript/announcing-typescript-3-8-beta/#type-only-imports-exports)