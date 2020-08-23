// 暂时性死区
// function tempDeadBlock (arg: number) {
//   a++;
//   let a = 0;
// }
function foo() {
    // okay to capture 'a'
    return a;
}
// 不能在'a'被声明前调用'foo'
// 运行时应该抛出错误
foo();
var a;
// 重定义
function f(x) {
    var x = 0;
}
function g() {
    var y = 0;
    var y = 0;
}
// 屏蔽
function sheild() {
    var y = 0;
    for (var y_1 = 0; y_1 < 10; y_1++) {
        console.log(y_1);
    }
    return y;
}
