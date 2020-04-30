# 起步

> TypeScript 只会进行静态检查，如果发现有错误，编译的时候就会报错。


#### 基础类型

在我认为，null和undefined 边界是很模糊的两个值。比如null在typeof 操作符返回的类型是 object等

在TS中，他们各自声明的是

```ts
let n: null = null

let m: undefined = undefined
```

与 void 的区别是，undefined 和 null 是所有类型的子类型。也就是说 undefined 类型的变量，可以赋值给 number 类型的变量


**any类**

**类型推论**

如果没有明确的指定类型，那么 TypeScript 会依照类型推论（Type Inference）的规则推断出一个类型。

```ts
let myHomelocation = 'hangzhou'

myHomelocation = 88

// primary.ts:19:1 - error TS2322: Type '88' is not assignable to type 'string'.

// 19 myHomelocation = 88
//    ~~~~~~~~~~~~~~


// Found 1 error.

```

当然未定义的变量，就是any类型


**联合类型**

当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，我们只能访问此联合类型的所有类型里共有的属性或方法

```ts
function getLength(something: string | number): number {
  return something.length;
}

// primary.ts:27:20 - error TS2339: Property 'length' does not exist on type 'string | number'.
//   Property 'length' does not exist on type 'number'.

// 27   return something.length;
//                       ~~~~~~


// Found 1 error.

```


#### interface

> TypeScript 中的接口是一个非常灵活的概念，除了可用于对类的一部分行为进行抽象以外，也常用于对**对象的形状（Shape）**进行描述。

保证对象同接口一致。

具体查看 interface.ts文件

**可选属性**

**任意属性**

> 需要注意的是，一旦定义了任意属性，那么 **确定属性和可选属性的类型** 都必须是它的 **类型的子集**
> 一个接口中只能定义一个任意属性。如果接口中有多个类型的属性，则可以在任意属性中使用联合类型：