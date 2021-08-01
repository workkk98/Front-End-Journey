Promise.resolve().then(() => {
  console.log(0);
  return Promise.resolve(4).then((val) => {
    return val;
  });
}).then((val) => {
  console.log(val);
});


Promise.resolve().then(() => {
  console.log(1);
}).then(() => {
  console.log(2);
}).then(() => {
  console.log(3);
}).then(() => {
  console.log(5);
})

// 输出0, 入队匿名函数1 (val) => { return val;} 入队NewPromiseResolveThenableJob
// 输出1， 入队console.log(2);
// 匿名函数1执行后，对应的promise1 fulfilled
// 执行newPromisethenableJob，发现promise1{fulfilled}，入队第一个then()的resolve函数
// 输出2
// resolve
// 输出3
