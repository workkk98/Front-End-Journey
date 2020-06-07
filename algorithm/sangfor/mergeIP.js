var N = 4
var parts = [
  [6, 8],
  [1, 2],
  [9, 16],
  [3, 5]
]


function merge (N, parts) {
  var res = []
    for(var i = 0; i < parts.length; i++) {
      if(i === 0) {
        res[0] = parts[i].slice();
        continue;
      }
      var part = parts[i].slice();
      for(var j = 0; j < res.length; j++) {
        if(j === 0 && part[1] < res[0][0]) {
          res = [part].concat(res);
          break
        }
        if(j === res.length -1 && part[0] > res[res.length-1][1]) {
          res[j+1] = part;
          break;
        }
        // part区间和res[j]区间有交集
        if(part[1] >= res[j][0]) {
          // part区间右边 小于等于 res[j]的右边
          if(part[1] <= res[j][1]) {
            if(part[0] < res[j][0]) {
              res[j][0] = part[0]
              // 区间变大
              res = merge(N, res)
              break;
            } else {
              // part被包含在res内
              break;
            }
          }
          // part区间右边 大于 res[j]的左边
          if(part[1] > res[j][0]) {
            if(part[0] < res[j][0]) {
              res[j][0] = part[0]
              res[j][1] = part[1]
              // 区间变大
              res = merge(N, res)
              break;
            } else if (part[0] <= res[j][1]) {
              res[j][1] = part[1]
              // 区间变大
              res = merge(N, res)
              break;
            }
          }
        } else {
          // 没有交集
          if(part[0] > res[j-1][1]) {
            res.splice(j, 0, part)
            break;
          }
        }
      }
    }
    return res
}

merge(N, parts).forEach(function (val) {
  console.log(val.join(' '))
})