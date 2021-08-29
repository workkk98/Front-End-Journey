
/**
 * 2、实现一个方法memoize 来缓存函数执行结果
 * 要求: 相同输入的情况下避免重复执行
 */
// const values = _.memoize(()=>{xxx})
// values(object); => valuea
// values(arg1, arg2); => valueb

function memoize (callback) {
  let set = [];
  let ans = []
  return function (...args) {
    let index = set.findIndex(params => params.every((param, index) => param === args[index]));
    if (index >= 0) {
      console.log('cache');
      return ans[index];
    } else {
      set.push(args);
      let res = callback(...args);
      ans.push(res);
      return res;
    }
  }
}

const values = memoize((...args) => args.reduce((acc, curr) => acc + curr));
console.log(values(1, 3, 4));
console.log(values(1, 2));
console.log(values(1, 3, 4));
