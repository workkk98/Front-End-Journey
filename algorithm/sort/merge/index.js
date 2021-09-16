// 自底向上, 为什么要有temp因为算法过程中会覆盖nums中的某些元素。
module.exports =  function mergeSort (nums) {
  return recursive(nums, 0, nums.length - 1, []);
}

function recursive (nums, left, right, temp) {
  // 数组中就一个元素，那么它必然是有序的
  if (left >= right) {
    return;
  }

  // 因为每一次分，必然是折半，所以时间复杂度是稳定的O(nlogn)
  const mid = left + Math.floor((right - left) / 2);
  recursive(nums, left, mid, temp);
  recursive(nums, mid + 1, right, temp);
  merge(nums, left, mid, right, temp);
  return nums;
}

function merge (nums, left, mid, right, temp) {
  // 缓存, 因为有可能覆盖
  for (let i = left; i <= right; ++i) {
    temp[i] =  nums[i];
  }

  // 用两个指针，指向两个数组
  let i = left,
      j = mid + 1;

  // 考虑下这种情况，左边的数值先拿光了
  for (let k = left; k <= right; ++k) {
    if (i > mid) {
      nums[k] = temp[j++];
    } else if (j > right) {
      nums[k] = temp[i++];
    } else if (temp[i] < temp[j]) {
      nums[k] = temp[i++];
    } else {
      nums[k] = temp[j++];
    }
  }
}