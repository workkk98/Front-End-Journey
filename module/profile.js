//export语法

export var lastName = 'Jordan';

var championNumber = 6;

var age = 50;

var firstName = 'Michael';

function plus (a,b) {
    return a+b;
}

export {firstName , plus as ppuls , championNumber , age};


export default 'newName'
//export语句输出的接口，与其对应值是动态绑定的关系

//default  =>  ab as default 其实就是as 语法的 变式 所以直接用在 变量声明里会报错 例如 export default var a = 1;
//上面代码中，export default a的含义是将变量a的值赋给变量default ,export default 41;正确