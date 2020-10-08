interface Named {
  name: string;
  age: number;
}

let x: Named;
// y's inferred type is { name: string; location: string; }
let y = { name: 'Alice', location: 'Seattle' };
x = y;

let addTwo = function (a, b) {
  return a + b;
}

let addThree = function (a, b, c) {
  return a + b + c;
}

// 允许忽略参数，但不允许增加参数。
// addTwo = addThree;

addThree = addTwo;