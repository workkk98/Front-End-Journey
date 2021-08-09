//选择排序
// 核心思路就是 每次循环 找到数组剩余中最小的并与当前 调换位置


// 时间复杂度O(n^2) 无论如何都是这个值 空间复杂度O(n)
var selectionSort = function selectionSort1 (nums) {
  console.log(selectionSort.name)
  for(let i = 0 , len = nums.length ; i < len -1 ; i++ ) {
    let j = i+1 , record = i;
    // 注意 要保留新的最小值的位置
    while( j < len) {
      record = nums[j] < nums[record] ? j : record;
      j++;
    }
    if(record !== i && record) {
      j = nums[i];
      nums[i] = nums[record];
      nums[record] = j
    }
  }
  return nums;
}

console.log(selectionSort([91, 60, 96, 7, 35, 65, 10, 65, 9, 30, 20, 31, 77, 81, 24]))

// 求最大值
