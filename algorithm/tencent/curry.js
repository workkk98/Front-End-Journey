// 这道问题主要考察的是函数柯里化的思想

// function sum (num) {
//   let nums = [];
//   function foo (num) {
//     nums.push(num)
//     return foo;
//   }

//   foo.count = function () {
//     const ans = nums.reduce((acc, curr) => acc + curr);
//     nums.length = 0;
//     return ans;
//   }

//   return foo(num); 
// }

// 拆成一个子问题，这样子就不需要清除nums中的元素了。
function sum (num) {
  return createCurry([], num);
}

function createCurry (record, num) {
  const record2 = [...record, num];
  function ans (num) {
    return createCurry(record2, num);
  }

  ans.count = function () {
    const ans = record2.reduce((acc, curr) => acc + curr);
    record.length = 0;
    return ans;
  }

  return ans;
}



console.log(sum(1)(2)(3).count());
console.log(sum(2)(3)(4).count());