<template>
 <div>
   2019年 {{getMonth}}月{{getDate}}日 {{getHours}}时{{getMinutes}}分{{getSeconds}}秒
 </div>
</template>
<script>
export default {
  name:'time-component',
  data () {
    // 注意这里 data被深拷贝了一份 所以在外面修改localtime 里面不受影响
    return {
      localTime: new Date()
    }
  },
  created() {
    // this也是一个问题
    setInterval( () => {
      this.localTime = new Date()
    },1000)
  },
  computed: {
    getMonth() {
      return this.localTime.getMonth() + 1
    },
    getDate() {
      return this.localTime.getDate()
    },
    getHours() {
      return this.localTime.getHours()
    },
    getMinutes() {
      return this.localTime.getMinutes()
    },
    getSeconds() {
      return this.localTime.getSeconds()
    }
  }
}
</script>
<style scoped>
 
</style>
