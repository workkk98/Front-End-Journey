// var high = Number(readline())
// var lhg = readline().split(' ')

function DP (high, lhg) {
  high = parseInt(high)
  lhg = lhg.map(function (val) { return parseInt(val) }).sort(function (a,b) {
      return a - b 
  })
    if(high < lhg[0]) {
        return 0
    }
    var record = []
    // 依次升序
    var cube1 = lhg[0], cube2 = lhg[1], cube3 = lhg[2]
    for(let i = 0; i <= high; i++) {
        if(i< cube1) {
            record[i] = 0
        } else {
            if(i === cube1) {
              record[i] = 1
            } else if (i < cube2){
              record[i] = record[i-cube1]
            } else if (i == cube2) {
              record[i] = record[i-cube1] + 1
            } else if (i < cube3) {
              record[i] = record[i-cube1] + record[i-cube2]
            } else if (i == cube3) {
              record[i] = record[i-cube1] + record[i-cube2] + 1
            } else {
              record[i] = record[i-cube1] + record[i-cube2] + record[i-cube3]
            }
        }
    }
    return record[high]
}

console.log(DP(20, [1,4,3]))