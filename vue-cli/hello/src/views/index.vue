<template>
    <div class="flex-container">
        <button @click="jumpNext('instagram')">jump to instagram</button>
        <button @click="jumpNext('test')">jump to test</button>
        <Count v-if="false"></Count>
        <countVuex v-if="false"></countVuex>
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
    },
    methods: {
        jumpNext(name) {
            if(name === 'test') {
                this.$router.push({ name: name, params: { id: 15}})
            } else {
                this.$router.push({ name: name})
            }
        }
    },
    beforeRouteLeave(to, from, next) {
        console.log("beforeRouteLeave")
        next()
    },
    mounted() {
        console.log(this.$route)
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

