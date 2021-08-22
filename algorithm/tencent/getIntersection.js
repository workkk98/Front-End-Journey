// 题目大概的意思是取若干个数组的并集

// 实际上还是不满足题意？因为某个数组中有重复的
// function getIntersection (...args) {
//   let map = {};
//   if (args.length === 1) {
//     return args[0];
//   }
//   for (let i = 0; i < args.length; ++i) {
//     args[i] = Array.from(new Set(args[i]));
//     for (let j = 0; j < args[i].length; ++j) {
//       let num = args[i][j];
//       if (typeof map[num] === 'number') {
//         ++map[num];
//       } else {
//         map[num] = 1;
//       }
//     }
//   }

//   return Object.entries(map).reduce((acc, [num, value]) => {
//     if (value === args.length) {
//       acc.push(+num);
//     }
//     return acc;
//   }, []);
// }

const case1 = [
  [1, 2, 3]
];

const case2 = [
  [1, 2, 3],
  [2, 3, 4]
];

const case3 = [
  [1, 4, 5],
  [6, 7, 9],
  [3, 5, 4]
];

// 其实思路应该简化成这样，数组A和数组B取得一个并集C后，再向数组D取并集
function getIntersection (...args) {
  return args.reduce((acc, curr) => acc.filter(item => curr.includes(item)));
}

console.log(getIntersection(...case1));
console.log(getIntersection(...case2));
console.log(getIntersection(...case3));
