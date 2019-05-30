//1.es5中没有块级作用域 只有全局作用域和函数作用域 这就导致了变量污染;

for(var i =0 ; i<10 ; ++i) {
    
}

console.log("问题1 "+i);  //10

//2.变量提升 意思就是说 js引擎在运行前 先声明了这个变量 置于脚本顶层
console.log("问题2 "+questionVar2); //undefined
var questionVar2 = 2;

//3.暂时性死区,Error:question3 is not defined
// var question3 = 1;
// if(question3) {
//     question3 = "abc";
//     let question3;  
// }

//4:不允许重复声明
let question4;
// let question4; ////Identifier 'question4' has already been declared

//5:let和const的全局变量不会挂在顶层对象下
let question5 = 'quesiont5';
console.log("问题5 "+global.question5);
var quesiontVar5 = 'quesiontVar5';
console.log("问题5 "+global.quesiontVar5);