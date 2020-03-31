var sortArray = function(nums) {
  var len = nums.length, lastNode = len - 1 % 2? (len-1) / 2 - 1: Math.floor((len-1 )/ 2)
  // 初次建立大顶堆堆
  for(let i = lastNode; i >= 0; i--) {
      heapify(i, nums, len);
  }
  for(let j = len - 1; j > 0 ; j--) {
      swap(0, j, nums)
      // 重新建堆 注意这里的数组长度
      heapify(0, nums, --len)
  }
  return nums
};

function heapify (i, nums, len) {
  var left = 2 * i + 1, right = 2 * i + 2;
  if(left >= len) {
      return;
  }
  // 如果两个子节点都存在
  if(left < len && right < len) {
      if(nums[left] > nums[right]) {
          if(nums[left] > nums[i]) {
              swap(i, left, nums)
              heapify(left, nums, len)
          }
      } else {
          if(nums[right] > nums[i]) {
              swap(i, right, nums)
              heapify(right, nums, len)
          }
      }
  } else {
      // 完全二叉树 只有左节点存在时
      if(left < len) {
          if(nums[left] > nums[i]) {
              swap(i, left, nums)
              return
          }
      }
  }
}

function swap (i, j, nums) {
  var temp = nums[i]
  nums[i] = nums[j]
  nums[j] = temp
}

sortArray([5,2,3,1])