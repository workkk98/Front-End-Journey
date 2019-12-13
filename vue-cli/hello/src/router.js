import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import IndexView from './views/index.vue'
import testVue from './views/test.vue'
import shoppingView from './views/shopping.vue'
import vmodel from './views/vModel.vue'

const router = new VueRouter({
    routes:[
        // 路由测试起点
        {
            name: 'index',
            path:'/index',
            component:IndexView,
            beforeEnter(to,from,next) {
                console.log("routes beforeEnter")
                next()
            }
        },
        //可复用的组件
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
            name: 'instagram',
            path:'/instagram',
            component:() => import('./views/instagram.vue'),
            alias:'/',
            beforeEnter(to,from,next) {
                console.log('instagram beforeEnter')
                next()
            }
        },
        {
            path:'/vmodel',
            component:vmodel
        }
    ]
})
// 下次可以用作权限设计
router.beforeEach( (to,from,next) => {
    console.log("全局 beforeEach")
    next()
})

router.beforeResolve( (to,from,next) => {
    console.log("在同步或异步加载组件后 beforeResolve")
    next()
})

router.afterEach( (to,from) => {
    console.log("afterEach 没有next")
})

export default router;