const ans = compose(f1, f2)(f3)(f4)([1, 2, 3])
console.log(ans);
console.log(f4(f3(f2(f1([1,2,3])))));
function compose() {
  //todo
  const argArr = Array.from(arguments);
  return function (args) {
    if (typeof args === 'function') {
      return compose(...argArr.concat(args));
    } else {
      return argArr.reduce((acc, fn) => fn(acc), args);
    }
  }
}
 
function f1(args) {
    return args.map((a) => a * 1);
}
 
function f2(args) {
    return args.map((a) => a * 2);
}
 
function f3(args) {
    return args.map((a) => a * 3);
}
 
function f4(args) {
    return args.map((a) => a + 3);
}

