const foo = new ArrayBuffer(8);

// 视图是长度1字节的int signed类型，所以int是-128 ～ 127
const firstByteInFoo = new Int8Array(foo);

firstByteInFoo[0] = 127;
console.log(firstByteInFoo[0])