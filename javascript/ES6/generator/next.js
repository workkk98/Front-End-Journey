function* next(params) {
    for(let i = 0 ; i < 1000 ; i++) {
        let reset = yield i;
        console.log(reset)
        if(reset > 1000 ) {
            i = 1001;
        }
    }
}

let p = next();

console.log(p.next());
console.log(p.next());
console.log(p.next());

//果next方法没有参数，每次运行到yield表达式，变量reset的值总是undefined。
console.log(p.next(1001));
//但当 调用next函数中加入参数 ，使得reset得到赋值，通过这个方法来修改函数的行为


//next,throw,return 都是把yield关键词换成 args ， throw关键词， return关键词