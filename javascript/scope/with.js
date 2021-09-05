function assignPropertyA (obj, value) {
  // var a = 'default A';
  with (obj) {
    a = value;
  }
  console.log(a);
}

const foo = {
  a: 'a1'
};

const bar = {
  b: 'b1'
}

assignPropertyA(foo, 'a2');
console.log(foo); // { a: 'a2' }
assignPropertyA(bar, 'b1');
console.log(bar); // { b: 'b1' }
console.log(a); // b1