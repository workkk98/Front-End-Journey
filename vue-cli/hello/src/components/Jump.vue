<template>
    <div>
        <router-link :to="{name:'test',params:{id:666}}"></router-link>
    </div>
</template>

<script>
export default {
    name:'jump'
}
</script>

<style scoped>
    div{
        border: 1px red solid;
    }
</style>
