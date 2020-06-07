var handle = 3
// for(var i = 0; i < 8; i++) {
//     checkerboard[i] = readline().split(' ').map(function (val) {
//         return parseInt(val)
//     })
// }
var checkerboard = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 2, 0, 0, 0],
  [0, 2, 1, 2, 1, 1, 1, 0],
  [0, 0, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 0, 1, 0, 0, 0]
]
var direction = [[-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1]]
var max = 0

function answer (handle, checkerboard) {
  // 黑白子总共下的次数
  var n = handle * 2 - 1;
  dfs(0, checkerboard, n)
  return max
}

// dfs函数指 具体下棋的某次操作
function dfs (step, checkerboard, n) {
  // 当下棋次数等于总次数时, 计算白子总和
  if(step === n) {
    var sum = 0;
    for(var i = 0; i < 8; i++) {
      for(var j = 0; j < 8; j++) {
        if(checkerboard[i][j] === 2) {
          sum++
        }
      }
    }
    max = Math.max(max, sum)
    return
  }
  // 该步的棋子颜色
  var color = 2 - (step % 2);
  var revColor = 3 - color;
  var nextCheckerBoard
  // 具体下棋的步骤
  for(var i = 0; i < 8; i++) {
    for(var j = 0; j < 8; j++) {
      // 只有0可以下棋
      if(checkerboard[i][j] === 0) {
        // 八个方向，每个方向满足条件就翻棋子
        var flag = false, count = 0
        for(var dir = 0; dir < direction.length; dir++) {
          // 具体可翻棋子数目
          count = handlePlayChess(checkerboard, direction[dir], i, j, color, revColor)
          if(count > 1) {
            //设置棋子并返回更新后的的棋盘, 如果已经改过用上次改的棋盘
            if(!flag) {
              nextCheckerBoard = copyBoard(checkerboard)
              flag = true
            }
            setPlayChess(nextCheckerBoard, direction[dir], i, j, color, count)
          }
        }
        if (flag) {
          dfs(step+1, nextCheckerBoard, n)
        }
      }
    }
  }
}

// 处理该位置某个方向 是否可落子
function handlePlayChess (checkerboard, dir, i, j, color, revColor) {
  var count = 1
  i += dir[0]
  j += dir[1]
  while(i >= 0 && i < 8 && j >= 0 && j < 8) {
    if(checkerboard[i][j] === color) {
      return count
    } else if (checkerboard[i][j] !== revColor) {
      return 0
    }
    i += dir[0]
    j += dir[1]
    count++
  }
  // 如果超出边界了只能返回0 例如某一行 0 1(七个)
  return 0
}

// 更新棋盘
function setPlayChess (checkerboard, dir, i, j, color, count) {
  // count统计的是通过落子变色的棋子, 所以加1是为了给落子
  for(index = 0; index < count; index++) {
    checkerboard[i][j] = color
    i+= dir[0]
    j+= dir[1]
  }
}

function copyBoard (checkerboard) {
  var next = []
  for(var i = 0; i < 8; i++) {
    next[i] = []
    for(var j = 0; j < 8; j++) {
      next[i][j] = checkerboard[i][j]
    }
  }
  return next
}

console.log(answer(handle, checkerboard))