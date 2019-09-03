<template>
    <div>
        <button :value="sbv" @click="dialogValue"> 
        </button>
        <div>
            <slot name="title">提交</slot> 
            </div>  
        <div>
            <slot name="a"></slot>
        </div>
    </div>
</template>

<script>
export default {
    name:'slotButton',
    props:['sbv'],
    methods:{
        dialogValue() {
            console.log(this.$props.sbv);
        }
    }
}
</script>

<style scoped>

</style>