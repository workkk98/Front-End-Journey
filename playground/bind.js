Function.prototype._bind = function (thisArg, ...args) {
  let self = this;
  return function (...args2) {
    return self.apply(thisArg, args.concat(args2));
  }
}

function add (a, b, c) {
  console.log(this);
  return a + b + c;
}

let ret = add.bind({ foo: 'foo' }, 1, 2)(3);
console.log(ret);