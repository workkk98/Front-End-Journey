# 命名空间

> 关于术语的一点说明: 请务必注意一点，TypeScript 1.5里术语名已经发生了变化。 “内部模块”现在称做“命名空间”。 “外部模块”现在则简称为“模块”，这是为了与 ECMAScript 2015里的术语保持一致，(也就是说 module X { 相当于现在推荐的写法 namespace X {)。

简而言之，模块是指外部模块，命名空间是指内部模块。

### NameSpace

命名空间内部的变量是只有内部才能访问的，除非使用export 命令将其暴露。

实质就是使用了IIFE函数。

### 分离到多文件

**尽管是不同的文件，它们仍是同一个命名空间，并且在使用的时候就如同它们在一个文件中定义的一样。** 因为不同文件之间存在依赖关系，所以我们加入了**引用标签**`/// <reference path="xxx" />`来告诉编译器文件之间的关联。 我们的测试代码保持不变。

因为是多个文件，我们必须确保所有编译后的代码都被加载了。
1. 通过`--outFile`
完整的例子,千万别漏了 same.js。这个参数指定了输出什么。
```shell
tsc --outFile same.js test.js
```
> 编译器会根据源码里的引用标签自动地对输出进行排序。你也可以单独地指定每个文件。

下面这个没啥大用处。
```
tsc --outFile sample.js Validation.ts LettersOnlyValidator.ts ZipCodeValidator.ts Test.ts
```

2. 第二种方式，我们可以编译每一个文件（默认方式），那么每个源文件都会对应生成一个JavaScript文件。 然后，在页面上通过 `<script>`标签把所有生成的JavaScript文件按正确的顺序引进来，比如：

```html
  <script src="Validation.js" type="text/javascript" />
  <script src="LettersOnlyValidator.js" type="text/javascript" />
  <script src="ZipCodeValidator.js" type="text/javascript" />
  <script src="Test.js" type="text/javascript" />
```

### 别名

如果命名空间嵌套的特别深，就需要别名来简化。

`import alias = Shapes.Polygons;`实际上这个语法就变成了赋值操作。

### 使用其他的JavaScript库
为了描述**不是用TypeScript**编写的类库的类型，我们需要声明类库导出的API。 由于大部分程序库只提供少数的顶级对象，命名空间是用来表示它们的一个好办法。

我们称其为声明是因为它不是外部程序的具体实现。 我们通常在 .d.ts里写这些声明。 如果你熟悉C/C++，你可以把它们当做 .h文件。 让我们看一些例子。
