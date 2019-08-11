<template>
    <div>
        <button v-on:click="selfEmit">以下犯上</button>
    </div>
</template>

<script>
export default {
    name:'以下犯上',
    methods:{
        selfEmit() {
            this.$emit('selfEmit',"行动代号：以下犯上");
        }
    }
}
</script>

<style>

</style>
