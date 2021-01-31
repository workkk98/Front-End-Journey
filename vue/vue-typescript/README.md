# demo

### shims.vue.d.ts文件(shim 垫片)

这类文件被称为Ambient Declarations（外部模块定义），主要为项目所有的Vue文件做模块声明，**毕竟ts默认只识别`.d.ts, .ts, .tsx`后缀文件。**

[What does the shims-tsx.d.ts file do in a Vue-Typescript project?
](https://stackoverflow.com/questions/54622621/what-does-the-shims-tsx-d-ts-file-do-in-a-vue-typescript-project)
> helps your IDE to understand what a file ending in .vue is

我们可以看到demo2这个具体的例子，当你删除demo2里的shims.vue.d.ts文件中的内容，`main.ts`ts编译器就不认识vue文件了。

这个文件实际上告诉ts编译器，每次你引入一个模块叫做*.vue文件，不要真正的去引入，而是把它当作有这些contents。

> The first declare module is called ambient module, which is used to describe modules written in JavaScript.
The second declare global is called (external) module, which is a TypeScript specific module system designed before ES-module. Global types like Array and JSX.Element resides in this module type.

And finally it seems that TS cannot mix up two modules, sadly. The compiler thinks one file has one single module type. So the error occurs.

### shims-jsx.d.ts

jsx不怎么了解，现在这里记一下。

> 后者为 JSX 语法的全局命名空间，这是因为基于值的元素会简单的在它所在的作用域里按标识符查找（此处使用的是**无状态函数组件 (SFC)**的方法来定义），当在 tsconfig 内开启了 jsx 语法支持后，其会自动识别对应的 .tsx 结尾的文件，可参考官网 jsx。 --[摘自掘金](https://juejin.cn/post/6844903882309500942#heading-3)