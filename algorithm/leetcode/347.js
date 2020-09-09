var topKFrequent = function(nums, k) {
  nums = nums.sort((a, b) => {
      return a-b;
  })
  var map = {}, queue = [];
  console.log(nums)
  for(let i = 0; i < nums.length; i++) {
      if(!map[nums[i]]) {
          map[nums[i]] = 1
      } else {
        map[nums[i]]++;
      }
      if(nums[i] !== nums[i+1]) {
          let freqI = map[nums[i]];
          if(queue.length === 0) {
              queue.push(nums[i])
              continue;
          }
          for(var j = 0; j < queue.length; j++) {
              let freqJ = map[queue[j]];
              if(freqI > freqJ) {
                  queue.splice(j, 0, nums[i])
                  break;
              }
          }
          if(j === queue.length) {
            queue[j] = nums[i]
          }
      }
  }
  return queue.slice(0, k)
};

console.log(topKFrequent([1,1,1,2,2,3],2))