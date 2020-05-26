# 声明文件

> 自己的一些理解，第三方模块往往提供的是全局函数，全局变量，全局类等内容。所以通过声明文件来规范第三方模块。

> 通常我们会把声明语句放到一个单独的文件里。

一般来说，ts 会解析项目中所有的 *.ts 文件，当然也包含以 .d.ts 结尾的文件。所以当我们将 jQuery.d.ts 放到项目中时，其他所有 *.ts 文件就都可以获得 jQuery 的类型定义了。
**.d.ts该文件的d应该指的就是declare声明的意思**

全局变量的几种声明方法
### declare var|const|let ...

只能定义类型，而不能定义具体的实现。

### declare function

函数重载也是允许的

### declare enum

指定枚举变量的各个属性名称。

### declare namespace

> 在声明文件中，namespace是经常使用的，它用来表示全局变量是个对象，包含很多子属性。

namespace中允许嵌套namespace, 并使用其它声明变量。
```ts
declare namespace jQuery {
  const version: number;
  function ajax(url: string): void;
}
```

而且在使用其它声明变量时，无需在写 declare



