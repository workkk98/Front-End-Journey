//object.create 机制  用于创建一个新的对象，它使用现有对象作为新对象的 __proto__.

//new操作符
function anotherNew (fun) {
    const obj =  new Object();
    obj.__proto__ = fun.prototype;
    fun.call(obj);
    return obj;
}