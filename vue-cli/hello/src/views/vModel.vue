<template>
    <div>
        <cpn v-model="value"></cpn>
        <slot-button v-bind:sbv="sbv" ref="slot">
            <template v-slot:title>
                {{content}}
            </template>
            <template v-slot:a>
                <a href="https://github.com" target="_blank">点我去github</a>
            </template>
        </slot-button> 
    <button @click="clickSlot">click slot</button>

    <h3>重新学习template slot</h3>
    <slot-button>
        <template slot="a">aaaaa</template>
        <template slot="title">title title</template>
        <template slot-scope="useless">这些杂七杂八的归 default管   这个是通过slot-scope属性获取{{useless}}</template>
        <template v-slot:grid="scope">这里开始v-slot  v-slot:key="scope"  {{scope.age}}</template>
    </slot-button>
    </div>
</template>

<script>
//这里的value 会传入ivalue这个prop
import cpn from '../components/vModels'
import slotButton from '../components/slot'
export default {
    name:'v-model',
    components:{
        cpn,
        'slot-button':slotButton
    },
    data() {
        return {
            value:28,
            sbv:23,
            content:"点我知道，父级传入值",
            character:{
                user:{
                    name:'xiaofan',
                    age:21
                }
            }
        }
    },
    methods:{
        aaa(v) {
            this.value = v;
        },
        clickSlot() {
            this.$refs.slot.dialogValue()
        }
    },
    watch:{
        value:function (val) {
            console.log(val)
        }
    }
}
</script> 


<style scoped>

</style>