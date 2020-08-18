# 命名空间

> 关于术语的一点说明: 请务必注意一点，TypeScript 1.5里术语名已经发生了变化。 “内部模块”现在称做“命名空间”。 “外部模块”现在则简称为“模块”，这是为了与 ECMAScript 2015里的术语保持一致，(也就是说 module X { 相当于现在推荐的写法 namespace X {)。

简而言之，模块是指外部模块，命名空间是指内部模块。

### NameSpace

命名空间内部的变量是只有内部才能访问的，除非使用export 命令将其暴露。

实质就是使用了IIFE函数。