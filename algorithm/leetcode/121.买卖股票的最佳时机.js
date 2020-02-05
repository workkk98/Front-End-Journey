var maxProfit = function(prices) {
  let max = 0, len = prices.length , i = 0 ;
  function ret(index) {
    let max = prices[index++];
    while(index < len) {
      if( prices[index] > max) {
        max = prices[index]
      }
      index++;
    }
    return max
  }
  while( i < len -1) {
    let res = ret(i+1) - prices[i]
    max = max > res ? max : res;
    i++
  }
  return max
};

// best 时间复杂度O(n)

var maxProfit = function(prices) {
  let min = Number.MAX_VALUE, max = 0 , res;
  for(let i =0, len = prices.length ; i<len ; i++) {
    if( prices[i] < min) {
      min = prices[i]
    } else {
      let newMax = prices[i] - min;
      max = max > newMax ? max : newMax;
    }
  }
  return max;
};