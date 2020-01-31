var searchInsert = function(nums, target) {
  if(nums.length === 0) {
    nums[0] = target;
    return 0
  }
  let Len = nums.length, index = Math.floor(Len/2),
    first = 0 , last = Len-1;
  while(true) {
    if( nums[index] === target ) {
      break;
    }
    if( nums[index] > target ) {
      // 如果first和index重合 意味着不可以再折半查找了 也就是说 数组中找不到target只能插入元素了
      if(first === index) {
        nums.splice(first,0,target)
        break;
      } else if (index === last && nums[first] < target) {
        nums.splice(index,0,target)
      } else {
        last = index;
        index = Math.floor((first+index)/2);
      }
    }
    if( nums[index] < target ) {
      if(last === index) {
        nums.splice(++index,0,target)
        break;
      } else if( first === index && target < nums[last]) {
        nums.splice(++index,0,target)
        break;
      } else {
        first = index;
        index = Math.ceil((last+index)/2);
      }
    }
  }
  return index;
};

var index = searchInsert([1,3],1)
console.log(index)


// 这题毫无疑问 最生硬的办法就是按顺序遍历 但这个代价就是时间复杂度为O(n)

// 所以我用了二分查找的思想。时间复杂度O(n/2)

// 要注意的地方就是 

// 1. first<= index <= last 所以需要对这些个情况进行 判断
// 2. 还有一点是我自己的粗心导致的。 nums[index] === target 那么剩下的逻辑肯定是 
// nums[index] 大于 或 小于 target 所以 没必要加 = 号 导致错误。