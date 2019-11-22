//基础用法
function printKeys(params,more) {
    let keys = Object.keys(this);
    return [...keys,params,more];
}

let obj = {
    a:'a',
    b:'b'
}

console.log(printKeys())
console.log(printKeys.call(obj,'c','d'))

console.log(printKeys.apply(obj,['c','d']))

let newPrintKeys = printKeys.bind(obj,['c','d'])

console.log(newPrintKeys())

//由此可见call和apply都是直接调用函数，区别就是携带的第一个参数以外的参数，bind是返回一个新的函数


