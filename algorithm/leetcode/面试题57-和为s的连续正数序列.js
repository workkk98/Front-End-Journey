var findContinuousSequence = function(target) {
  // 利用等差数列公示
  var n = [];
  // i代表 等差数列的项数
  for(let i = 2; i < target; i++) {
      var result = 2 * target / i;
      if(!Number.isInteger(result) || result < i) {
          continue;
      }
      if(i%2 === 0 && result%2 !== 0) {
          var a1 = (result - i + 1) /2, seq = [];
          for(let j=0; j < i; j++) {
              seq[j] = a1 + j;
          }
          n.push(seq)
      }
      if(i%2 !== 0 && result%2 === 0) {
          var a1 = (result - i + 1) /2, seq = [];
          for(let j=0; j < i; j++) {
              seq[j] = a1 + j;
          }
          n.push(seq)
      }
  }
  return n.reverse()
};