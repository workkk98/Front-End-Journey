/**
 * @param {number[][]} nums
 * @return {number[]}
 */
var smallestRange = function(nums) {
  // k代表有k个数组
  let k = nums.length,
      heap = [],
      max = Number.MIN_SAFE_INTEGER,
      indexArray = []
  // 创建指针，指向每个数组的索引
  for(let i = 0; i < k; i++) {
      // 初始化小顶堆
      heap[i] = nums[i][0]
      max = Math.max(nums[i][0], max)
      indexArray[i] = 0;
  }
//   console.log(heap)
  // 建立小顶堆
  buildHeap(nums, nums.length-1, heap, indexArray, nums.length);
  // console.log(heap)
  let interval = [heap[0], max];
  // console.log(interval)
  while(heap[0] !== undefined) {

      // 由于数组的单调性， heap的最小值切换为对应数组的下个值
      heap[0] = nums[0][++indexArray[0]]

      max = Math.max(heap[0], max);
      // 重建堆
      recusive(nums, 0, heap, indexArray, nums.length)
      // console.log(heap);
      if(max - heap[0] < interval[1] - interval[0]) {
          interval = [heap[0], max]
      }
      if (max - heap[0] === interval[1] - interval[0] && heap[0] < interval[0]) {
          interval = [heap[0], max]
      }

  }
  return interval
};

// 构建小顶堆，并维护值 - index - arr的映射关系，这三个值都在数组中的同一个位置。
function buildHeap (nums, i, heap, indexArray, length) {
  for(let j = i; j >=0 ; j--) {
      recusive(nums, j, heap, indexArray, length)
  }
}

function recusive (nums, i, heap, indexArray, length) {

  let temp, left = 2*i+1, right = 2*i+2;
  if(left >= length) {
      return
  } else if (right >= length && heap[left] < heap[i]){
      temp = heap[i];
      heap[i] = heap[left];
      heap[left] = temp;

      numsHandler(i, left, nums)

      indexArrayHandler(i, left, indexArray)
      return
  }
  
  if(heap[left] <= heap[right]) {
      if(heap[left] < heap[i]) {
          temp = heap[i];
          heap[i] = heap[left];
          heap[left] = temp;

          numsHandler(i, left, nums)

          indexArrayHandler(i, left, indexArray)

          recusive(nums, left, heap, indexArray, length)
      }
  } else {
      if(heap[right] < heap[i]) {
          temp = heap[i];
          heap[i] = heap[right];
          heap[right] = temp;

          numsHandler(i, right, nums)

          indexArrayHandler(i, right, indexArray)

          recusive(nums, right, heap, indexArray, length)
      }
  }
}

// 处理index映射关系
function indexArrayHandler (i, j, indexArray) {
  if(indexArray[i] === indexArray[j]) {
      return;
  } else {
      let temp = indexArray[i];
      indexArray[i] = indexArray[j];
      indexArray[j] = temp;
  }
}

// 只要替换，nums必定跟着换
function numsHandler (i, j, nums) {
  let temp = nums[i];
  nums[i] = nums[j];
  nums[j] = temp
}

console.log(smallestRange([[11,38,83,84,84,85,88,89,89,92],
  [28,61,89],
  [52,77,79,80,81],
  [21,25,26,26,26,27],
  [9,83,85,90],
  [84,85,87],
  [26,68,70,71],
  [36,40,41,42,45],
  [-34,21],
  [-28,-28,-23,1,13,21,28,37,37,38],
  [-74,1,2,22,33,35,43,45],
  [54,96,98,98,99],
  [43,54,60,65,71,75],
  [43,46],
  [50,50,58,67,69],
  [7,14,15],
  [78,80,89,89,90],
  [35,47,63,69,77,92,94]]))