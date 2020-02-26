// 一些自己整理的堆的性质可以看 日记 20_02_25
var heapsort = function heapSort1 (nums) {
  let size = nums.length;
  let mid = Math.floor((size-1)/2);
  // 建立最大堆
  for(let i = mid; i >= 0; i--) {
    heapup(nums , i , size);
  }
  console.log(nums)
  // 因为只是交换了 大顶堆 与末尾的数字 所以只需要从0处 重新建立大顶堆即可
  for(let j = size-1 ; j >0 ; j--) {
    swap(nums , 0 , j);
    heapup(nums , 0 , --size)
  }
  return nums;
}


function heapup (nums, index, size) {
  let largest = index;
  // 这里要注意下 数组是从0开始 推得的关系
  let left = index * 2 + 1;
  let right = index * 2 + 2;
  // 千万注意是 父节点 和 两个子节点又要去比较
  if(left < size &&  nums[left] > nums[index]) {
    largest = left;
  }
  if(right < size &&  nums[right] > nums[largest]) {
    largest = right;
  }
  // 注意这一步 除了要交换 父节点和子节点外 因为不知道交换后 是否对子树的堆性质产生影响 所以得递归操作
  if(largest !== index) {
    swap(nums, index,largest);
    heapup(nums, largest , size)
  }
}

function swap (nums,prev,curr) {
  let temp = nums[prev];
  nums[prev] = nums[curr];
  nums[curr] = temp;
}

console.log(heapsort([91, 60, 96, 7, 35, 65, 10, 65, 9, 30, 20, 31, 77, 81, 24]))