var longestPalindrome = function(s) {

  // 枚举
  // let len = s.length, maxLenStr = "", reverseStr = s.split('').reverse().join('');
  // let str, rStr;
  // for(let i = 0; i < len; i++) {
  //     for(let j= i+1; j< len+1 ; j++) {
  //         str = s.slice(i,j);
  //         rStr = reverseStr.slice(len-j, len-i)
  //         if(rStr == str) {
  //             maxLenStr = maxLenStr.length < str.length ? str : maxLenStr
  //         }
  //     }
  // }
  // return maxLenStr

  // 动态规划
  var len = s.length, dp = new Array(len);
  for(let i = 0; i<len; i++) {
      dp[i] = new Array(len)
  }
  var start,end,maxLen = 0;
  // 状态是指 某段字符串是否是回文串
  for(let j = 0; j<len; j++) {
      for(let i = 0; i<j+1; i++) {
          // 即是字符串中一个字符的情况
          if(i == j) {
              dp[i][j] = true;
              if(maxLen < 1) {
                  maxLen = 1;
                  start = i;
                  end = j;
              }
          } else if(j - i == 1) {
              if(s[i] == s[j]) {
                  dp[i][j] = true;
                  if(maxLen < 2) {
                      maxLen = 2;
                      start = i;
                      end = j;
                  }
              } else {
                  dp[i][j] = false;
              }
          } else {
              if(s[i] == s[j] && dp[i+1][j-1]) {
                  dp[i][j] = true;
                  if(maxLen < j+1-i) {
                      maxLen = j+1-i;
                      start = i;
                      end = j;
                  }
              } else {
                  dp[i][j] = false
              }
          }
      }
  }
  return s.slice(start, end+1)
};

console.log(longestPalindrome("bab"))