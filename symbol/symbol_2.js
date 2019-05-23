let s = Symbol('s');

let y = Symbol.for('s'); //机制：全局搜索给的入参key是否存在，存在则返回同一个值，否则返回一个新值

let sy = Symbol.for('y');

console.log(s); //Symbol(s)
console.log(y);  //Symbol(s)

console.log( s === y ); //false   

console.log ( y === Symbol.for('s')); //true

//这里就说明 symbol s 和 symbol y仍是不相等的 ，但是和其他用Symbol.for()找到的symbol变量相等

console.log( s === sy );