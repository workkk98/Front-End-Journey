# declare

通过`declare`关键字来告诉TypeScript，你正在试图表述一个其他地方已经存在的代码。如：写在 JavaScript、CoffeeScript 或者是像浏览器和 Node.js 运行环境里的代码

如`./index.ts`中的例子，如果没有事先在`global.d.ts`文件中声明,则会报错。
你可以打开当前目录的shell环境，并执行以下语句:
```ts
// 如果删除了global.d.ts文件就会报错
tsc --build tsconfig.json
```

如果一个文件有扩展名 .d.ts，这意味着每个**根级别的声明**都必须以 `declare` 关键字作为前缀。这有利于让开发者清楚的知道，在这里 TypeScript 将不会把它编译成任何代码，同时开发者需要确保这些在编译时存在。

### tsconfig中的types属性

默认是node_modules/@types域下的全部声明文件。但如果被特殊指定了，只有被特殊列举的声明文件会用于全局环境。

### tsconfig中的typeRoots属性

指明了tsc编译器从哪些目录下找types文件。