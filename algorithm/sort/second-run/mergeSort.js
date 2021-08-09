// 还是二分的思想

var mergeSort = function mergeSort1(nums) {
  if(nums.length == 1) {
    return nums
  }
  let midIndex = Math.floor(nums.length / 2 );
  // mergeSort返回的 left 和 right 都是有序数组
  var left = nums.slice(0, midIndex);
  left = mergeSort(left)
  var right = nums.slice(midIndex);
  right = mergeSort(right)
  return concat(left, right);
}

function concat(left, right) {
  var newArr = [], i = 0, j = 0;
  while(i < left.length && j < right.length) {
    if(left[i] < right[j]) {
      newArr.push(left[i++])
    } else {
      newArr.push(right[j++])
    }
  }
  if(i < left.length) {
    newArr = newArr.concat(left.slice(i))
  } else {
    newArr = newArr.concat(right.slice(j))
  }
  return newArr
}

console.log(mergeSort([10,9,2,3,8,9,0,1,7]))