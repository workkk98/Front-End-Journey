var month = parseInt("5");

// 剩余月份 和 兔子数量
function solveNums (left , num) {
    let rabbit = [0,0,0,0,0];
    // 每个月计算 兔子的生殖年龄 和 生出的兔子
    for (let month = 1 ; month <= left ; month ++) {
      if(month === 1) {
        rabbit[4] = num;
      } else {
        let big = rabbit.shift();
        rabbit[0] += big;
        rabbit.push(rabbit[0]);
      }
      console.log(rabbit)
    }
    return rabbit.reduce((prev ,curr) => prev + curr)
}

console.log(solveNums(month , 1))