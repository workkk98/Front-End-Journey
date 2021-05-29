// 第一版仅创建一个闭包函数
function curry1 (func) {
  const args = Array.prototype.slice.call(arguments, 1);
  return function (...args2) {
    return func.apply(null, args.concat(args2))
  }
}

function add (a, b, c) {
  return a + b + c;
}

const add1 = curry1(add, 1 , 2);
console.log(add1(3))

// 第二版手写版错误版，因为每次返回
// function curry2 (fn) {
//   let length = fn.length;
//   let args = [];
//   function buitIn() {
//     args = args.concat(Array.from(arguments));
//     if (args.length < length) {
//       return buitIn;
//     } else {
//       return fn.apply(null, args);
//     }
//   }
//   return buitIn;
// }

// 第二版
function createBuiltIn (fn, args, requireLength) {
  return function () {
    requireLength -= arguments.length;
    if (requireLength > 0) {
      return createBuiltIn(fn, args.concat(Array.from(arguments)), requireLength);
    } else {
      return fn.apply(this, args.concat(Array.from(arguments)))
    }
  }
}

function curry2 (fn) {
  return function () {
    if (arguments.length < fn.length) {
      return createBuiltIn(fn, Array.from(arguments), fn.length - arguments.length);
    } else {
      return fn.apply(this, arguments);
    }
  }
}

let add2 = curry2(add);
console.log('curry2:', add2(3)(4)(5));
console.log('curry2:', add2(3, 4)(5))