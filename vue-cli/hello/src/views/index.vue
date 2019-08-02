<template>
    <div class="flex-container">
        <Count></Count>
        <count></count>
    </div>
</template>

<script>
import Count from '../components/Count'
export default {
    name:'index',
    components:{
        Count
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

