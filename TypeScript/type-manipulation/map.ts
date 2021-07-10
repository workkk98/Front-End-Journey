type Foo = {
  [propName in 'a' | 'b']: any;
}

// in枚举操作符号不仅可以用于union类型，单个类型也是可以枚举的。例如

type Foo2 = {
  [propName in 'a']: any;
}
