Function.prototype._bind = function (thisArg, ...args) {
  let self = this;
  function empty () {}

  return function (...args2) {
    // 如果遇到new关键字呢？new是优先于bind
    // new.target此时就很好用了
    if (new.target) {
      return self.apply(this, args.concat(args2));
    }
    return self.apply(thisArg, args.concat(args2));
  }
}

function add (a, b, c) {
  this.add = true;
  return a + b + c;
}

// let ret = add._bind({ foo: 'foo' }, 1, 2);
// console.log(ret(3))

const bar = { bar: 'bar' }
let ret2 = add._bind(bar, 1, 2);
console.log(bar);
console.log(new ret2({ bar2: 'bar2'}))

