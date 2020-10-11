interface Person {
  name: string;
  age: number;
}

// 为什么这里type不能声明成Readonly和Partial，是因为这两个类型已被ts声明
type Read <T> = {
  readonly [P in keyof T]: T[P];
}
type Part <T> = {
  [P in keyof T]?: T[P];
}

// 切记type Read只是引用了类型字面量，通过泛型的导入，类型字面量创建了一个只读版本的Person
type PersonReadonly = Read <Person>;
