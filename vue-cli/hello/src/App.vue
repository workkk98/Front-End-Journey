<template>
  <div id="app">
    <jump>跳转到666</jump>
    <router-view></router-view>
  </div>
</template>

<script>
import jump from './components/Jump.vue'
export default {
  name: 'app',
  components: {
    jump
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
