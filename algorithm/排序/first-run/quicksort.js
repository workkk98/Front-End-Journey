// quicksort 

var quicksort = function (arr) {
  if(arr.length <= 1) {
    return arr;
  }
  var pivot = Math.floor(arr.length / 2);
  var pivotArr = arr.splice(pivot , 1);
  const left = [] ,right = [];
  // 小于基准放左边 大于基准放右边
  for(var i = 0; i<arr.length ; i++) {
    if(arr[i] < pivotArr[0]) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }
  return quicksort(left).concat(pivotArr , quicksort(right))
}

console.log(quicksort([1,5,3,4,7,2,8]))