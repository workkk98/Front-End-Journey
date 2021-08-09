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

const quicksort2 = function quickSortHand (nums) {
  if(nums.length < 2) {
    return nums;
  }
  let pivot = Math.floor(nums.length / 2);
  const mid = nums.splice(pivot , 1)[0];
  const left =[] , right = [];
  for(let i =0 ; i< nums.length ; i++) {
    if(nums[i] < mid) {
      left.push(nums[i])
    } else {
      right.push(nums[i])
    }
  }
  return quicksort2(left).concat([mid],quicksort2(right))
}

console.log(quicksort2([91, 60, 96, 7, 35, 65, 10, 65, 9, 30, 20, 31, 77, 81, 24]))