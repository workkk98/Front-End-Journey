# 起步

> TypeScript 只会进行静态检查，如果发现有错误，编译的时候就会报错。

```
// 通过node命令行
tsc xxxx.ts
```


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

> 联合类型的变量在被赋值的时候，会根据类型推论(type inference)的规则推断出一个类型。

例如union-types文件中的例子，每当赋值时，tsc会推断该变量的类型。假设赋值为string，可以使用string的相关属性和方法。

#### interface

> TypeScript 中的接口是一个非常灵活的概念，除了可用于对类的一部分行为进行抽象以外，也常用于对**对象的形状（Shape）**进行描述。

保证对象同接口一致。

具体查看 interface.ts文件

**可选属性**

**任意属性**

> :exclamation::exclamation:需要注意的是，一旦定义了任意属性，那么 **确定属性和可选属性的类型** 都必须是它的 **类型的子集**
> 一个接口中只能定义**唯一**一个任意属性。如果接口中有多个类型的属性，则可以在任意属性中使用联合类型

另外任意属性，只能针对键名是相同类型的属性，例如：

```ts
interface person {
  [propName: string]: string,
  0: 0,
  name: 2333
}
```
propName这个任意属性只能针对name属性

**只读属性**

> 注意，只读的约束存在于**第一次给对象赋值的时候**，而不是第一次给只读属性赋值的时候
> 我的理解就是，只能在声明对象时，对这个只读属性进行赋值。

#### 数组

#### function

注意下, 使用interface来定义函数表达式
```ts
interface func {
  (a: number, b: number): boolean
}
// 括号内代表入参, 括号结尾跟着boolean
```

##### 泛型Generics

我对泛型的理解就是，抽象的一个数据类型，它是按照输入变量的类型变化的。
有了它就不用老是使用“any”

使用方法
```ts
function createArray<T> (leng: number, item: T): Array<T> {
  return [item, item, item]
}
```

但也有些局限性，因为T的类型是未知的，所以我们不能随意的去操作它的属性，否则会带来
一些reference、type的错误。通过泛型约束来使T类型必须含有相关的属性

例如
```ts
interface Person {
  age: string
}
function sayAge<T extends Person> (person: T): void {
  console.log(person.age)
}
```

另外在函数表达式方面，因为我们知道可以用interface表示一个函数变量
在这里也可以把函数变量使用泛型声明

```ts
interface creaArray {
  <T>(item: T): [T,T]
}
interface creaArray<T> {
  (item: T): [T,T]
}
```