let arr = [[{a: 1, b: 2},{a: 1, b: 3}],[{a: 2, b: 1},{a: 3, b: 2}]];

// 数组取并集、数组取交集
function main (arr, ans) {
  for (let i = 0; i < arr.length; ++i) {
    let item = arr[i];
    if (Array.isArray(item)) {
      main(item, ans);
    } else {
      if (ans.findIndex(ele => ele.a === item.a) === -1) {
        ans.push(item)
      }
    }
  }

  return ans;
}

console.log(main(arr, []).reduce((acc, item) => acc + item.a, ''));