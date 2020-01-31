// 又名外观数列

// 例子: n指的是第几个序号
// 1.  1
// 2.  11  (因为第一个读成1个1)
// 3.  21  (因为第二个读成2个1)
// 4.  1211 (因为第三个读成 1个2，一个1)
// 以此类推。也就是说每个值都是上个值的外观读法。

// 那具体思路就是把上一个结果整理分组，再对每个分组的值统计成字符串即可

var countAndSay = function(n) {
  let answer = '1'
  if(n===1) {
    return answer
  }
  function say(answer) {
    // 观察下 读数就知道 同值可以放在数组的同一个位置
    let arr = [] , index =0;
    for(let i = 0 , len = answer.length ; i<len ; i++) {
      if(i === 0) {
        arr.push(answer[i]);
        continue;
      }
      // 加入index指向的元素单个内容和 answer[i] 相同
      if(arr[index][0] === answer[i]) {
        arr[index] = arr[index] + answer[i]
      } else {
        arr.push(answer[i]);
        index ++;
      }
    }
    return arr.reduce(function (previous , current) {
      return previous+current.length + current[0];
    },'')
  }
  while(n > 1) {
    answer = say(answer);
    n--;
  }
  return answer
};