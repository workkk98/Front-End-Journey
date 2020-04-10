// 机器人的运动范围
var movingCount = function(m, n, k) {
  // 初始位置的统计
  var record = [], initalPosition = [[0,0]], count = 1;
  for(let i = 0; i < m; i++) {
      record[i] = []
      for(let j = 0; j < n; j++) {
          record[i][j] = 0
      }
  }
  record[0][0] = 1
  while(initalPosition.length > 0) {
      var nextPosition = []
      for(let position of initalPosition) {
          var x = position[0], y = position[1];
          // 上移 符合条件, 且是非访问过的点
          if(x > 0 && isLessthanK(x-1, y, k) && record[x-1][y] === 0) {
              record[x-1][y] = 1;
              nextPosition.push([x-1, y])
              count++
          }
          // 右移
          if(y < n-1 && isLessthanK(x, y+1, k) && record[x][y+1] === 0) {
              record[x][y+1] = 1;
              nextPosition.push([x, y+1])
              count++
          }
          // 下移
          if(x < m-1 && isLessthanK(x+1, y, k) && record[x+1][y] === 0) {
              record[x+1][y] = 1;
              nextPosition.push([x+1, y])
              count++
          }
          // 左移
          if(y > 0 && isLessthanK(x, y-1, k) &&  record[x][y-1] === 0) {
              record[x][y-1] = 1;
              nextPosition.push([x, y-1])
              count++
          }
      }
      initalPosition = nextPosition;
  }
  return count
};

function isLessthanK (x, y, k) {
  var sum = 0;
  while(x >= 1 || y >= 1) {
      if(x >= 1) {
          sum += (x % 10)
          x = Math.floor(x / 10);
      }
      if(y >= 1) {
          sum += (y % 10)
          y = Math.floor(y / 10);
      }
  }
  return sum <= k
}

movingCount(7, 2, 3)