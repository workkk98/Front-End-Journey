var lengthOfLastWord = function(s) {
  if(s === '') {
    return 0
  }
  // 使用g会全局搜索完返回匹配字符的数组 而不是用g则 正则对象会记录下一个匹配位置 pattern.lastIndex
  const pattern = /([\w]+) *$/gi;
  let matches = s.match(pattern)
  console.log(matches)
  if(matches == null) {
    return 0
  }
  var formatS = matches[0].replace(/ */g, '')
  return formatS.length
};
console.log(lengthOfLastWord("b   a    "))