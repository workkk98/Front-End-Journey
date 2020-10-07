# 泛型 （函数的某种类型）

### 定义和使用

T是一个类型参数，**通常写在参数前**。
```ts
function identity<T>(arg: T): T {
    return arg;
}

identity<string>("myString")
identity("myString")
```

### 泛型类型和使用

> 我们也可以使用不同的泛型参数名，只要在数量上和使用方式上能对应上就可以。
具体可以看下index.ts这个例子，实际上类型参数数量多，甚至是入参数量多都没有问题。

泛型接口
```ts

// 1. 类型参数是局部的
interface GenericIdentityFn {
  <T> (arg: T): T;
}

// 2. 类型参数是全局的
interface GenericIdentityFn <T> {
  (arg: T): T;
}
```
第二种声明interface的方法，把类型参数当作了整个接口的一个参数。
> 这样接口里的其它成员也能知道这个参数的类型了。

通过显式定义泛型函数的类型
```ts
let myIdentity: GenericIdentityFn<number> = identity;
```
那么myIdentity函数的类型就只能是number类型。

### 泛型约束（Constraints）

1. 约束类型
因为使用了类型参数，并不能保证某些入参都有某个属性。e.g.
```ts
function getLength <T> (arg: T) {
  return arg.length;
}
```
在这种情况下编译器就会报错，因为编译器不知道arg的原因。

为此我们可以定义一个类型约束，限制类型参数的类型。此后，该函数只能传入符合某种类型的参数。

2. 约束值

当我们想从某个对象里拿去某个属性时，需要确保这个属性名属于这个对象。
```ts
function getProperty <T, K extends keyof T> (obj: T, key: K) {
  return obj[key];
}
```

3. 在泛型里使用类类型

官方的例子是这样的。
```ts
function create<T>(c: { new(): T; }): T {
    return new c();
}
```

入参c的类型是`{ new(): T; }`，要注意到这里用了接口字面量：构造函数签名。指明c是个构造函数。这里很简单，就是说明了传入的入参是个构造函数，返回了类型变量T，并返回这个新的类型。其实返回值的类型声明有些多余。

更高级的：
```ts
function create<T extends Animal>(c: { new(): T; }): T {
    return new c();
}
```
构造函数返回的内容必须是Animal或其子类。



