<template>
    <div class="flex-element">
        <button @click="count()">点击就加数字</button>
        <p>{{number}}</p>
    </div>
</template>

<script>
export default {
    name:'count',
    props:{},
    data() {
        return {
            number:0
        }
    },
    created() {
        this.number = 5;
    },
    methods: {
        count() {
            ++this.number;
        }
    }
}
</script>

<style>
    .flex-element {
        flex:1 1 200px
    }
</style>


