import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import IndexView from './views/index.vue'
import testVue from './views/test.vue'
import shoppingView from './views/shopping.vue'
import instagram from './views/instagram.vue'
import vmodel from './views/vModel.vue'

const router = new VueRouter({
    routes:[
        {
            path:'/index',
            component:IndexView
        },
        {
            path :'/test/:id',
            component:testVue,
            name:'test',
            children:[
//以 / 开头的嵌套路径会被当作根路径。 这让你充分的使用嵌套组件而无须设置嵌套的路径。
                {
                    path:'index',
                    component:IndexView
                }
            ]
        },
        //vuex巩固
        {
            path:"/shopping",
            component:shoppingView
        },
        {
            path:'/instagram',
            component:instagram,
            alias:'/'
        },
        {
            path:'/vmodel',
            component:vmodel
        }
    ]
})

export default router;