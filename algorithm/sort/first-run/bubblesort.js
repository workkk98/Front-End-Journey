// bubble 冒泡排序 也是最基础的一种
// 冒泡就同它的名字一样 思路是 把最大或最小的值 交换到数组头部 (当然也可以从尾部开始 一样的道理)
var bubble = function bubble1 (nums) {
  for(let i = 0 ; i <nums.length-1 ; i++) {
    for (let j = i+1 ; j < nums.length ; j++) {
      if(nums[i] > nums[j]) {
        let swap = nums[i];
        nums[i] = nums[j];
        nums[j] = swap;
      }
    }
  }
  return nums;
}
// 事实上 我这个写的 应该是选择排序
// 上面这个函数 画个逻辑图 觉得 不太像冒泡(就不是冒泡) 重新写个试试

// 所以冒泡 应该是这么理解  从低端一步步交换到顶端

bubble = function bubble2 (nums) {
  for(let i = 0; i < nums.length-1 ; i++) {
    for(let j = nums.length -1 ;  j > i ; j--) {
      if(nums[j] <= nums[j-1]) {
        let swap = nums[j];
        nums[j] = nums[j-1];
        nums[j-1] = swap
      }
    }
  }
  return nums
}

//console.log(bubble([1,2,3,4,3,9,6,8,9,3]))

// 之前的算法 应该时间复杂度是这样子的 (n-1)*(n-2)*(n-3)*···*1
// 我们可以想象 这样的情况 在一次冒泡后可能顶端部分已然排序好了 那我们可以从排序好的下一层继续开始冒泡排序。
// 所以记录下最后一次 交换的位置

// 避免一点 第二次若没有发生交换 可能是排序已经完成 所以要退出
bubble = function bubble3 (nums) {
  let len = nums.length,i = 0,postion = 0;
  while(i< len-1) {
    for(let j = len -1 ; j > i ; j--) {
      if(nums[j] < nums[j-1]) {
        swap(nums,j,j-1)
        postion = j;
      }
    }
    // 假如 冒泡过程中没有 交换过 则说明 已然排序好了退出循环
    if(postion == i) {
      break;
    }
    i = postion;
  }
  return nums;
}

//console.log(bubble([1,2,3,4,3,9,6,8,9,3]))

// 每次循环 双向遍历也就是说一次 获得一个最大值 一次获得一个最小值
// 每次循环 实际上是 O(n+n-1) 所以 还是有一定优化的
bubble = function bubble4 (nums) {
  let start = 0,len = nums.length ,end = len -1;
  while(start < end ) {
    // 这一趟循环 交换下来 end位置是最大的值
    for(let i = 0; i < end ; i++) {
      if(nums[i] >= nums[i+1]) {
        swap(nums , i ,i+1)
      }
    }
    end--;
    for(let i = end; i>0 ; i--) {
      if(nums[end] < nums[end-1]) {
        swap(nums , i ,i-1)
      }
    }
    start++;
  }
  return nums
}

//console.log(bubble([1,2,3,4,3,9,6,8,9,3]))


// 合二为一
bubble = function bubble5 (nums) {
  let start = 0,len = nums.length ,end = len -1 , topPos , bottomPos;
  while(start < end ) {
    // 解决 若第二次循环 没有交换的情况 即已经排序完成
    let topPos = bottomPos = 0;
    // 这一趟循环 交换下来 end位置是最大的值
    for(let i = 0; i < end ; i++) {
      if(nums[i] >= nums[i+1]) {
        swap(nums , i ,i+1)
        topPos = i;
      }
    }
    for(let i = end; i>0 ; i--) {
      if(nums[end] < nums[end-1]) {
        swap(nums , i ,i-1)
        bottomPos = i
      }
    }
    end = topPos;
    start = bottomPos;
  }
  return nums
}

console.log(bubble([1,2,3,4,3,9,6,8,9,3]))


// 工具人
function swap (arr, i , j) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}



