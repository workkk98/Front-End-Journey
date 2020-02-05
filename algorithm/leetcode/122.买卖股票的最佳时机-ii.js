var maxProfit = function(prices) {
  let sum = 0, i = 0 , len = prices.length , low = Number.MAX_VALUE, high = Number.MIN_VALUE;
  while( i < len) {
    if(prices[i] < low) {
      low = prices[i]
    }
    if(prices[i] >= high) {
      high = prices[i]
      if(prices[i+1] < high || prices[i+1] == undefined) {
        sum = (high - low) + sum;
        low = Number.MAX_VALUE;
        high = Number.MIN_VALUE
      }
    }
    i++
  }
  return sum
};
// 要求 在买入新股票前 必须卖掉旧股票
// 画个折线图 交易次数越多越好

// Your runtime beats 37.54 % of javascript submissions
// Your memory usage beats 39.99 % of javascript submissions (35.5 MB)