<template>
    <div>
        <button v-on:click="selfEmit">以下犯上</button>
    </div>
</template>

<script>
export default {
    name:'yixiafanshang',
    methods:{
        selfEmit() {
            this.$emit('selfEmit',"行动代号：以下犯上","能加些sauce");
        }
    }
}
</script>

<style>

</style>
