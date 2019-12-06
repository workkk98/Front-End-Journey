let s = Symbol('s');

let y = Symbol('s');
// console.log(typeof s); //symbol
// console.log(s); //Symbol(s)

// console.log(s === y) ; //false


let object = {
    [s]:'symbol:s',
    s : "s",
    [y] : 'symbol:y'
}

// console.log(object.s === object['s']); //true

console.log(object.s  + "   "  + object[s]);

console.log(Object.getOwnPropertySymbols(object));  //返回对象中的 symbol属性数组

console.log(Reflect.ownKeys(object));

