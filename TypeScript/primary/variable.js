// 暂时性死区
//虽然这些变量始终“存在”于它们的作用域里，但在直到声明它的代码之前的区域都属于 暂时性死区。
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
console.log(foo());
var a;
