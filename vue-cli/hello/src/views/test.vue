<template>
    <div>
        <input type="text" :value="id">
        <div>{{message}}</div>
        <emit v-on:selfEmit="getMessage"></emit>    
        <router-view></router-view>
    </div>
</template>

<script>
import emit from '../components/emit'
export default {
    name:'test',
    data() {
        return {
            id:0,
            message:''
        }
    },
    components:{
        emit
    },
    created() {
        this.id =this.$route.params.id;
    },
    /**
     * 提醒一下，当使用路由参数时，例如从 /user/foo 导航到 /user/bar，
     * 原来的组件实例会被复用。因为两个路由都渲染同个组件，比起销毁再创建，复用则显得更加高效。
     * 不过，这也意味着组件的生命周期钩子不会再被调用。
     * 复用组件时，想对路由参数的变化作出响应的话，
     * 你可以简单地 watch (监测变化) $route 对象
     * 或者使用 2.2 中引入的 beforeRouteUpdate 导航守卫
     */
    watch: {
        '$route' (to) {
            this.id = to.params.id;
        }
    },
    methods:{
        getMessage(message,sauce) {
            //说明这个可能是用arguments来做到 ，传入多个值的
            this.message = message + sauce;
        }
    }
}
</script>

<style>

</style>
