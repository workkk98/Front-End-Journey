// 希尔排序 shell sort
// 是插入排序的改进版，它克服了插入排序只能移动一个相邻位置的缺陷

var shellSort = function shellSortDemo (nums) {
  let len = nums.length
  let gap = Math.floor(nums.length / 2);
  while(gap > 0) {
    for(let i = gap ; i < len ;  i++) {
      let temp = nums[i];
      let preIndex = i - gap;
      while(nums[preIndex] > temp) {
        nums[preIndex + gap] = nums[preIndex];
        preIndex -= gap;
      }
      nums[preIndex + gap] = temp;
    }
    gap = Math.floor(gap / 2);
  }
  return nums;
}

console.log(shellSort([91, 60, 96, 7, 35, 65, 10, 65, 9, 30, 20, 31, 77, 81, 24]))