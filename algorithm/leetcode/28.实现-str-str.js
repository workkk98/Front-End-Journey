// 思路 把needle当把刻度尺 然后去量取haystack里的东西

var strStr = function(haystack, needle) {
  if(needle === "") {
    return 0
  }
  let point = 0 ,
  needleLen = needle.length,
  haystackLen = haystack.length;
  if(needleLen > haystackLen) {
    return -1
  }
  while( point>=0 ) {
    if(haystack.substring(point,point+needleLen) === needle) {
      break;
    }
    if( needleLen >=  haystackLen - point + 1 ) {
      point = -1;
      break;
    }
    point++;
  }
  return point
};