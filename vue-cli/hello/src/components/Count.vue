<template>
    <div class="flex-element">
        <div>{{whatToday}}</div>
        <button @click="countA()">点击就加数字</button>
        <p>{{number}}</p>
        <p>我是旁边的store中的count属性:{{countAlias}}</p>
        <p>{{showLocalCountAndCount}}</p>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name:'count',
    props:{},
    data() {
        return {
            number:0,
            localCount:20190806
        }
    },
    created() {
        this.number = 5;
    },
    computed:{
        ...mapState({
            count: state => state.count,
            countAlias:'count',
            showLocalCountAndCount(state) {
                return `localCount:${this.localCount} and State.count:${state.count}`
            }
        }),
        whatToday() {
            //getter 在通过属性访问时是作为 Vue 的响应式系统的一部分缓存其中的
            //getter 在通过方法访问时，每次都会去进行调用，而不会缓存结果。
            return this.$store.getters.format;
        },
    }
     ,
    methods: {
        countA() {
            ++this.number;
        }
    }
}
</script>

<style>
    .flex-element {
        flex:1 1 200px
    }
</style>


