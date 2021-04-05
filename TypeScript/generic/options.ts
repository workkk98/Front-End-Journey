interface Foo {
  value: number;
}
// 这里可以炫个技，实际上等价于foo: Foo。
function add <T>(foo: T extends Foo ? Foo : never) {
  return foo.value + 2;
}

add(2)

// 推断T某个属性为t，它的类型是Test，如果是则返回Test，否则返回number
type Bar <T> = T extends {t: infer Test} ? Test : number;
type Foo1 = Bar<string>;
type Foo2 = Bar<{ t: string }>


