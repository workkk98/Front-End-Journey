<template>
    <div>
        <div>{{title}}</div>
        <div>{{ count }}</div>
        <button v-on:click="increment()">修改state中的count属性</button>
        <button v-on:click="incrementSlow()">修改state中的count属性(actions)</button>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name:'CountVuex',
    computed:mapState([
        'count',
        'title'
    ]),
    methods:{
        //mutations版 同步
        increment () {
            this.$store.commit('increment');
        },
        //actions版 异步
        incrementSlow () {
            this.$store.dispatch('increment').then(function () {
                console.log('actions promise成功')
            });
        }
    }
}
</script>

<style scoped>
    div {
        flex:1 1 200px;
    }
</style>
