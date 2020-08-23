let array = [1, 2, 3, 4];
let [, b, , c] = array;

let api = {
  message: '',
  data: {}
}
let { data, message } = api;


// 两次的默认值
function f({ a, b = 0 } = { a: "" }) {
  // ...
}
f({ a: "yes" }); // ok, default b = 0
f(); // ok, default to {a: ""}, which then defaults b = 0
//f({}); // error, 'a' is required if you supply an argument