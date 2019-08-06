<template>
    <div class="flex-container">
        <Count></Count>
        <countVuex></countVuex>
    </div>
</template>

<script>
import Count from '../components/Count'
import CountVuex from '../components/CountVuex.vue'

export default {
    name:'index',
    components:{
        Count,
        CountVuex
    }
}
</script>

<style scoped>
    .flex-container {
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>

