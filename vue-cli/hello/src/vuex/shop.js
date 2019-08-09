export default {
    state:{
        product:[]
    },
    getters:{
        sumPrice: (state) => state.product.reduce((acc,next) => acc.length+next.length)
    },
    mutations:{
        incrementProduct(state,playload) {
            state.product.push(playload.productName)
        }
    },
    actions:{

    }
}