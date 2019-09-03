<template>
    <div>
        <cpn v-model="value"></cpn>
        <slot-button v-bind:sbv="sbv">
            <template v-slot:title>
                {{content}}
            </template>
            <template v-slot:a>
                <a href="https://github.com" target="_blank">点我去github</a>
            </template>

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
            sbv:0,
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
        }
    }
}
</script> 


<style scoped>

</style>