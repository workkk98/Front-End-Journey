// insertion sort 插入排序

// 核心思路就是  插入到合适的位置 且是排序好的数组中。

// 要注意插入的方式： 以排序好的数组 是往后挪 这样会减少交换的次数

var insertion = function insertion1 (nums) {
  if(nums.length == 1) {
    return nums
  }
  for(let i = 1 ; i < nums.length ; i++) {
    var temp = nums[i],preIndex = i-1;
    while(nums[preIndex] > temp) {
      nums[preIndex+1] = nums[preIndex];
      preIndex--;
    }
    nums[preIndex+1] = temp
  }
  return nums
}

// 稍微借用下 reduce的方法。
var insertion = function insertion2 (nums) {
  console.log(insertion.name)
  if(nums.length == 1) {
    return nums
  }
  nums.reduce((prev,curr,i) => {
    var temp = nums[i],preIndex = i-1;
    while(nums[preIndex] > temp) {
      nums[preIndex+1] = nums[preIndex];
      preIndex--;
    }
    nums[preIndex+1] = temp
  })
  return nums
}

console.log(insertion([91, 60, 96, 7, 35, 65, 10, 65, 9, 30, 20, 31, 77, 81, 24]))


// 优化思想 因为插入排序 前面的数组 已排序好了 完全可以用 二分查找的思想。

function binary (nums, end , target) {
  let start = 0;
  while(start < end) {
    let mid = Math.floor(start + (end - start) / 2);
    if(nums[mid] === target) {
      return mid;
    } else if(nums[mid] < target){
      start = mid + 1;
    } else {
      end = mid -1;
    }
  }
  return start;
}


var insertion = function insertion3 (nums) {
  console.log(insertion.name)
  if(nums.length == 1) {
    return nums
  }
  nums.reduce((prev,curr,i) => {
    var temp = nums[i],preIndex = i-1;
    var newPos = binary(nums , i-1 , temp);
    if(nums[newPos] <= temp) {
      newPos++;
    }
    while(i > newPos) {
      nums[i] = nums[i-1];
      i--;
    }
    nums[newPos] = temp
  })
  return nums
}

console.log(insertion([91, 60, 96, 7, 35, 65, 10, 65, 9, 30, 20, 31, 77, 81, 24]))