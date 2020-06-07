var K = 10
var N = 8
var balls = [10, 9, 8, 13, 6, 12, 22, 14, 3, 2]

function ans(balls, K, N) {
  var results = []
  function backtrack (balls, K, N, begin, left, path) {
    if(left === 0) {
      // 如果输出的path小于balls的长度，前面自动补0
      while(path.length < balls.length) {
        path = '0' + path
      }
      results.push(path)
      return
    }
    for(var j = balls[begin]; j >= 0; j--) {
      if(j > left) {
        continue
      }
      backtrack(balls, K, N, begin-1, left-j, j+path)
    }
  }
  backtrack(balls, K, N, balls.length-1, N, '')
  return results
}

ans(balls, K, N).sort().forEach(function (val) {
  console.log(val)
})