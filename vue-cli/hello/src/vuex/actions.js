export default {
    //Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象
    increment({commit},playload) {
        // context.commit('increment')
        return new Promise(function(resolve){
            setTimeout(function () {
                commit('increment');
                resolve();
            },1000);
        })
    }
}