// 归并排序

// 有点像快排 
// 主要思路： 递推时分组 ，直到分成只有一个数的数组
// 归的时候对两个数组排序 因为两个只含有一个数的数组必然是有序的 所以对它进行合并 也必然是有序的
// 不断的归的过程中合并 有序的两个数组 最后得到的结果就是有序的数组
var mergeSort = function mergeSort1 (nums) {
  let len = nums.length,mid = Math.floor(nums.length/2);
  if(len < 2) {
    return nums;
  }
  let left = nums.slice(0,mid);
  let right = nums.slice(mid);

  return merge(mergeSort(left) , mergeSort(right))
}

function merge (left ,right) {
  let mergeNums = [];
  while(left.length >0 && right.length >0) {
    mergeNums.push(left[0] < right[0] ? left.shift() : right.shift());
  }
  // 这一步是为了让长度为1的数组 加入到最后的结果中去
  return mergeNums.concat(left,right)
}

console.log(mergeSort([91, 60, 96, 7, 35, 65, 10, 65, 9, 30, 20, 31, 77, 81, 24]));

// 自己手写 使用splice节约空间
mergeSort = function mergeSort2(nums) {
  if(nums.length < 2) {
    return nums;
  }
  const mid = Math.floor(nums.length / 2);
  const left = nums.splice(0,mid);
  // mergeSort返回的是排序好的数组  所以把两个数组按照队列排序即可
  return merge2(mergeSort2(left),mergeSort2(nums));
}

function merge2(left,right) {
  const res = []
  while(left.length >0 && right.length > 0) {
    res.push(left[0] < right[0] ? left.shift() : right.shift())
  }
  return res.concat(left,right)
}

console.log(mergeSort([91, 60, 96, 7, 35, 65, 10, 65, 9, 30, 20, 31, 77, 81, 24]));