// 旋转矩阵
var rotate = function(matrix) {
  var copy = matrix.map((val) => val.slice())
  var n = matrix.length;
  for(let i = 0; i < n; i++) {
      for(let j =0; j < n; j++) {
          copy[j][n-1-i] = matrix[i][j]
      }
  }
  return copy
};


console.log(rotate([[1,2,3],[4,5,6],[7,8,9]]))