function uncarrying (func) {
  return function () {
    let target = Array.prototype.shift.call(arguments);
    return func.apply(target, arguments);
  }
}

const push = uncarrying(Array.prototype.push);

let arr = [];
push(arr, 1, 2, 3);
console.log(arr);