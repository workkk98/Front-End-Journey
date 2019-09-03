<template>
    <label for="">
        <input type="text" :value="ivalue" @input="cb">
    </label>
</template>   

<script>
export default {
    name:'cpn',
    props:['ivalue'],
    model:{
        prop:'ivalue',
        event:'input'
    },
    methods:{
        cb() {
            this.$emit('input',event.target.value);
        }
    }
}
</script>

<style>

</style>