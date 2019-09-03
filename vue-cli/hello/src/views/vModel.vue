<template>
    <div>
        <cpn v-model="value"></cpn>
    </div>
</template>

<script>
//这里的value 会传入ivalue这个prop
import cpn from '../components/vModels'
export default {
    name:'v-model',
    components:{
        cpn
    },
    data() {
        return {
            value:28
        }
    },
    methods:{
        aaa(v) {
            this.value = v;
            console.log(v)
        }
    }
}
</script> 


<style scoped>

</style>