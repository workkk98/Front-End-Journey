var graph = [
  [0, 12, 0, 0, 0, 16],
  [12, 0, 10, 0, 0, 7],
  [0, 10, 0, 3, 5, 6],
  [0, 0, 3, 0, 4, 0],
  [0, 0, 5, 4, 0, 2],
  [16, 7, 6, 0, 2, 0]
]

var map = ['A', 'B', 'C', 'D', 'E', 'F']

function bestPath (begin, end) {
  if(begin === end) {
    console.log(0)
    console.log(begin + ' ' + end)
  }
  var minTime = Number.MAX_VALUE
  var path = []
  // 访问过的地点
  var visited = [0, 0, 0, 0, 0, 0]
  backtrack(graph, map, 0, [], begin, end, visited)
  console.log(minTime)
  console.log(path)
  /**
   * 
   * @param {*} graph 图
   * @param {*} map 地点映射表
   * @param {*} time 花费时间
   * @param {*} currPath 当前路径
   * @param {*} pos 
   * @param {*} end 
   * @param {*} visited 
   */
  function backtrack (graph, map, time, currPath, pos, end, visited) {
    // 当前位置如果是终点则结束DFS
    if(pos === end) {
      if(time < minTime) {
        minTime = time
        path = currPath.join(' ')+ ' '+ end
      }
      return
    }
    // 下一个可去的地点数组
    var currentPosIndex = map.findIndex(function (val) {
      return val === pos
    })
    visited[currentPosIndex] = 1
    var nextPos = graph[currentPosIndex]
    // 选择下一个地点
    for(var i = 0; i < nextPos.length; i++) {
      // 选择可通行的地点且没有访问过
      if(nextPos[i] > 0 && visited[i] === 0) {
        // 花费的时间
        var cost = nextPos[i]
        // 剪枝
        if(time+cost >= minTime) {
          continue
        }
        // 做出选择
        currPath.push(pos)
        backtrack(graph, map, time+cost, currPath, map[i], end, visited)
        // 撤销
        currPath.pop()
      }
    }
    visited[currentPosIndex] = 0
  }
}

bestPath('C', 'E')