// 希尔排序

var shellsort = function shell(nums) {
  let gap = 0,len = nums.length;
  while(gap < len / 3) {
    gap = gap*3 + 1;
  }
  while(gap > 0) {
    for(let i = gap ; i< len ; i++) {
      let temp = nums[i];
      let preIndex = i-gap;
      while(nums[preIndex] > nums[preIndex + gap]) {
         nums[preIndex+gap] = nums[preIndex];
         preIndex-=gap;
      }
      nums[preIndex+gap] = temp;
    }
    gap = Math.floor(gap/2);
  }
  return nums;
}

console.log(shellsort([91, 60, 96, 7, 35, 65, 10, 65, 9, 30, 20, 31, 77, 81, 24]))