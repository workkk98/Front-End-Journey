var uniquePaths = function(m, n) {
  let memo = []
  for(let i = 0; i<m; i++) {
    memo.push(new Array(n))
  }
  function recursion (m,n) {
      if(m==0 && n==0) {
          return 1
      }
      if(n==0) {
          if(memo[m][n]) {
              return memo[m][n]
          }
          memo[m][n] = recursion(m-1,n)
          console.log(m,n)
          return memo[m][n]
      }
      if(m==0) {
          if(memo[m][n]) {
              return memo[m][n]
          }
          memo[m][n] = recursion(m,n-1)
          return memo[m][n]
      }
      if(memo[m][n]) {
          return memo[m][n]
      }
      memo[m][n] = recursion(m,n-1) + recursion(m-1,n)
      return memo[m][n]
  }
  let res = recursion(m-1,n-1);
  console.log(memo)
  return res
};

console.log(uniquePaths(2,2))