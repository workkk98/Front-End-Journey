# assertions

### as const

TS在3.4版本为字面量引入了一个新的结构。它的语法是一个类型断言将`const`放在类型名的位置例如`123 as const`。

- 在这种语法中，没有一个字面量类型会扩展（widened）
- 对象类型拿到了readonly属性
- 数组字面量变成可读元祖

除了上面提的到的一种类型推断的语法，还可以用

```ts
// Type '"hello"'
let x = <const>"hello";

let y = 'x'; // y被扩展成更通用的类型即string
```

用法一：

This feature means that types that would otherwise be used just to hint immutability to the compiler can often be omitted.
我猜的：此功能意味着通常仅用于那些对编译器来说经常省略的类型，提示不可变化的类型可以省略。

```ts
// Works with no types referenced or declared.
// We only needed a single const assertion.
function getShapes() {
  let result = [
    { kind: "circle", radius: 100 },
    { kind: "square", sideLength: 50 },
  ] as const;
  return result;
}
for (const shape of getShapes()) {
  // Narrows perfectly!
  if (shape.kind === "circle") {
    console.log("Circle radius", shape.radius);
  } else {
    console.log("Square side length", shape.sideLength);
  }
}
```

如果去掉`as const`, 下面的if分支或是else分支里的变量都是的类型则是`number | undefined`


Caveats警告

1. 目前仅能用于简单的字面量，别用在动态计算的字面量上。

```ts
// Error! A 'const' assertion can only be applied to a
// to a string, number, boolean, array, or object literal.
let a = (Math.random() < 0.5 ? 0 : 1) as const;
let b = (60 * 60 * 1000) as const;
```
2. const断言并非将表达式完全转换到完整地不可变

```ts
let arr = [1, 2, 3, 4];
let foo = {
  name: "foo",
  contents: arr,
} as const;
foo.name = "bar"; // error!
foo.contents = []; // error!
foo.contents.push(5); // ...works!
```