function identity <T> (arg: T) {
  return arg
}

var privateIdentity: <T, U> (arg: U, args: T) => U = identity;

// 函数签名
// interface GenericIdentityFn {
//   <T> (arg: T): T;
// }

interface GenericIdentityFn <T> {
 (arg: T): T;
}

let myIdentity: GenericIdentityFn<number> = identity;