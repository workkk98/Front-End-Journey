//object.create 机制  用于创建一个新的对象，它使用现有对象作为新对象的 __proto__.

//new操作符
function anotherNew (fun) {
    const obj =  new Object();
    obj.__proto__ = fun.prototype;
    fun.call(obj);
    return obj;
}

//掘金找到的好像更棒的 模拟new
function New(){
    var obj=new Object();
    //取出第一个参数，就是我们要传入的构造函数；此外因为shift会修改原数组，所以arguments会被去除第一个参数
    Constructor=[].shift.call(arguments);
    //将obj的原型指向构造函数，这样obj就可以访问到构造函数原型中的属性
    obj._proto_=Constructor.prototype;
    //使用apply改变构造函数this的指向到新建的对象，这样obj就可以访问到构造函数中的属性
    var ret=Constructor.apply(obj,arguments);
    //要返回obj
    return typeof ret === 'object' ? ret:obj;
}
