export default {
    //通过添加 namespaced: true 的方式使其成为带命名空间的模块
    namespaced:true,
    state:{
        product:[]
    },
    getters:{
        sumPrice: (state) => state.product.reduce((acc,next) => acc+next.productPrice,0)
    },
    mutations:{
        incrementProduct(state,playload) {
            state.product.push(playload)
        }
    },
    actions:{

    }
}