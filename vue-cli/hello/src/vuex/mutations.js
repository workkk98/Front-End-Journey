//规则最好提前在你的 store 中初始化好所有所需属性。

//当需要在对象上添加新属性时，你应该

//使用 Vue.set(obj, 'newProp', 123), 或者

//以新对象替换老对象。例如，利用 stage-3 的对象展开运算符我们可以这样写：

export default {
    //第一个参数默认state,第二个参数栽荷playload
    increment (state) {
        state.count++;
    }
} 


//mutation是同步操作