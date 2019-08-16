export default {
    //Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象，第二个参数 palyload
    //context对象中有commit函数 和 dispatch 函数 ，后者可以调用其他的action
    increment({commit}) {
        // context.commit('increment')
        return new Promise(function(resolve){
            setTimeout(function () {
                commit('increment');
                resolve();
            },1000);
        })
    }
}