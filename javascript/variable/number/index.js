
var x = 9007199254740992;
// 输出9007199254740992
console.log(x);

var y = -x;
console.log(x === x+1);
console.log(y == y - 1);

// 8进制

//如果八进制表达式写入了7以外的数字，那就会以十进制解析。
const foo = 007;
console.log(foo);

// 16进制

// 即1010-1111
const bar = 0xAF;
console.log(bar);