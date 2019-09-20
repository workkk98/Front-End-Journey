import  newName , { age , championNumber , pplus } from './proflie.js'


//node不支持 es6语法 所以得用 babel转义
console.log(pplus(age,championNumber));

console.log(newName)


//动态加载 与 import语法无关。类似与require()但是，require是同步，import是异步
import()
//import()加载模块成功以后，这个模块会作为一个对象，当作then方法的参数。因此，可以使用对象解构赋值的语法，获取输出接口。