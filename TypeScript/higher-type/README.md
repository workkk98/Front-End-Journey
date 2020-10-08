# 高级类型

### 交叉类型(Intersection Types)

> 交叉类型是将多个类型**合并为一个类型**。 这让我们可以把现有的多种类型叠加到一起成为一种类型，它包含了所需的所有类型的特性。

### 联合类型(Union Types)

```ts
function padLeft(value: string, padding: string | number) {
    // ...
}
```

### 类型保护与区分类型（Type Guards and Differentiating Types）

当我们知道有些地方是个确切的类型，但不想多次使用类型断言，就可以使用类型保护这种语法。

> 类型保护与区分类型（Type Guards and Differentiating Types）