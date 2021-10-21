function secondMax (arr) {
  if (arr.length <= 1) {
      throw Error();
  }
  
  let max = Math.max(arr[0], arr[1]);
  let second = Math.min(arr[0], arr[1]);
  for (let i = 2; i < arr.length; ++i) {
      if (arr[i] > max) {
          let temp = max;
          max = arr[i];
          second = temp;
      } else {
          second = Math.max(second, arr[i]);
      }
      
  }
  
  return second;
}

console.log(secondMax([-20, 30, 0, 11, 999, 21, 8, 67]))