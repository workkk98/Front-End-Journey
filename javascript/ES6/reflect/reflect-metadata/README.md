# 反射的意义

> 名称反射用于描述能够检查同一系统（或其自身）中的其他代码的代码。

反射对于许多用例（组合/依赖注入，运行时类型断言，测试）很有用。

我们的JavaScript应用程序越来越大，我们开始需要一些工具（如控件容器的反转）和像（运行时类型断言）这样的功能来管理这种日益增加的复杂性。问题在于，由于JavaScript中没有反射，因此无法实现某些工具和功能，或者至少它们不能像C＃或Java这样的编程语言那样强大。

强大的反射API应该允许我们在运行时检查未知对象并找出有关它的所有内容。我们应该能够找到像这样的东西：

实体的名称。
实体的类型。
哪些接口由实体实现。
实体属性的名称和类型。
实体的构造函数参数的名称和类型。

### 起步

1. 配置tsconfig中的compiler属性：
```json
  "compilerOptions": {
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true
  }
```

或者用命令行`tsc --target ES5 --experimentalDecorators --emitDecoratorMetadata index.ts`

2. 安装并引入`reflect-metadata`

### Reflect.getMetadata(metadataKey, target, propertyKey);

// get metadata value of a metadata key on the prototype chain of an object or property

从原型链或本对象中获取某个属性的原信息

metadataKey可以有这些可选值"design:type", "design:paramtypes", "design:returntype"

为什么这些值是固定的，首先因为在实现的过程中，调用的metadata函数，传入的字符串是这样的
```js
  __metadata("design:type", String)
```


### 参考

[typescript](https://www.typescriptlang.org/docs/handbook/decorators.html#metadata)
[TypeScript 中的 Decorator & 元数据反射](https://zhuanlan.zhihu.com/p/20743919)