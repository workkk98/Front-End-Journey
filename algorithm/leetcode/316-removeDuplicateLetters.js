var removeDuplicateLetters = function(s) {
  let stack = [],

      // 当前栈中的情况
      record = {},
      map = {};
  
  for (let char of s) {
      record[char] = 0;
      map[char] = !map[char] ? 1 : map[char] + 1;
  }

  for(let i = 0; i < s.length; i++) {
      if (i === 0) {

          stack.push(s[i]);
          record[s[i]] = 1;
          
          // s[i]剩余的数量
          map[s[i]]--;
          continue;
      }

      let top = getTop(stack);

      // 这种情况不能说明，s[i]在前面的序列不存在。有可能是因为top字符前面的某个字符是唯一的情况了，
      if (top.charCodeAt(0) < s[i].charCodeAt(0) && record[s[i]] == 0) {

          stack.push(s[i]);
          map[s[i]]--;
          record[s[i]] = 1;
      }

      // 相等的情况不处理，直接丢弃这个字符即可
      if (top === s[i]) {
        map[s[i]]--;
      }

      // 关键字符的场景
      if (top.charCodeAt(0) > s[i].charCodeAt(0)) {

          // 如果前面的字符串俨然有了s[i],则继续扫描
          if (record[s[i]] === 1) {
              map[s[i]]--;
              continue;
          }

          while (top.charCodeAt(0) > s[i].charCodeAt(0)) {

              // top字符在后面的字符串没有了，那就得保留这个字符。
              if (map[top] === 0) {
                  break;
              }

              stack.pop();
              record[top] = 0;

              if (stack.length === 0) {
                  break;
              }
              top = getTop(stack);
          }

          stack.push(s[i]);
          map[s[i]]--;
          record[s[i]] = 1;
      }
  }

  return stack.join('');
};

function getTop (array) {
  return array[array.length - 1];
}

console.log(removeDuplicateLetters('cbacdcbc'))