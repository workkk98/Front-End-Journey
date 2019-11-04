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
        <div>
            <slot :user="user" value="123"></slot>
        </div>
        <div>
            <slot name="grid" :age="age"></slot>
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
    },
    data() {
        return {
            user: 'zhf',
            age: '21'
        }
    }
}
</script>

<style scoped>

</style>