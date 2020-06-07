var coinChange = function(coins, amount) {
  let dp = []
  let min = null
  if(amount == 0) {
      return 0
  }
  for(let i = 0; i <= amount; i++) {
      if(i == 0) {
          dp[i] = -1
          continue
      }
      for(let j = coins.length-1; j >= 0; j--) {
          // 如果当前amount大于币值
          var coinVal = coins[j]
          if(i > coinVal) {
              if(dp[i-coinVal] > 0) {
                  if(min === -1 || min === null) {
                    min = dp[i-coinVal] + 1
                  } else {
                    min = Math.min(dp[i-coinVal] + 1, min)
                  }
              } else {
                  min = min === null ? -1 : min
              }
          } else {
              if(Number.isInteger(i/coinVal)) {
                  if(min === -1 || min === null) {
                    min = i/coinVal
                  } else {
                    min = Math.min(i/coinVal, min)
                  }
              } else {
                  min = min === null ? -1 : min
              }
          }
      }
      dp[i] = min
      min = null
  }
  return dp[amount]
};

console.log(coinChange([186,419,83,408], 6249))