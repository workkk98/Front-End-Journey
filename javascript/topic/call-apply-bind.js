function print(a,b,c) {
    console.log(this.name);
    console.log(arguments);
    return a;
}



Function.prototype._call = function (target) {
    //this指的就是本函数,target指的是改变的 this指向
    let args = Array.from(arguments)
    args.splice(0,1)
    const fn = this;
    target.fn = fn;
    let res = target.fn(...args)
    delete target.fn;
    return res;
}

//console.log(Object.prototype.toString._call(new Array)) //"[object Array]"
let obj = {
    name : 'obj'
}
//console.log(print._call(obj,1,2,3))


Function.prototype._apply = function (target,arr) {
    const fn = this;
    target.fn = fn;
    let res;
    if(arr === undefined) {
        res = target.fn();
    } else {
        res = target.fn(...arr);
    }
    delete target.fn;
    return res;
}

//console.log(Object.prototype.toString._apply(new Array))

Function.prototype._bind = function (target) {
    let fn = this;
    target.fn = this;
    let args = Array.from(arguments);
    args.splice(0,1);
    return function (params) {
        let res = target.fn(...args);
        delete target.fn;
        return res;
    }
}

console.log(print._bind(obj,1,2,3)())
//console.log(print.bind(obj,1,2,3)())

