// var input = parseInt("1928391");
// // input 正整数
// function resolve (input) {
//     // 记录次数
//     let count = 0;
//     while(input > 10) {
//         let inputStr = input + "";
//         input = inputStr.split("").reduce(function (prev , curr) {
//           return (+prev) * (+curr)
//         })
//         count++;
//     }
//     return count;
// }

// console.log(resolve(input))

var n = parseInt("2");
var aiNums = "5 2 8 5 1 5".split(" ");

function solve(n , aiNums) {
  // 排序完的数值
  let corrAiNums = aiNums.map(function (value) {
      return parseInt(value)
  }).sort((a,b) => a-b);
  let maxNums = 0;
  for (let i = n ; i < aiNums.length -1 ; i += 2) {
      maxNums += corrAiNums[i]
  }
  return maxNums
}

console.log(solve(n,aiNums))