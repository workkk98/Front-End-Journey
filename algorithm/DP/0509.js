function dp (n, time, cost) {
  var table = [];
  for (let i = 0; i < n; ++i) {
      table[i] = [];

      // j = 代表1分钟的时间
      for (let j = 0; j < time; ++j) {
          // 只听一首歌
          if (i === 0) {
              table[i][j] = cost[i];
          } else {
              // 处理下越界的情况
              var y = j >= cost[i] ? table[i-1][j-cost[i]] : 0; 
              table[i][j] = Math.max(y + cost[i], table[i-1][j]);
          }
      }
  }
  
  return table[n-1][time-1];
}

console.log(dp(3, 7, [4,3,2]));