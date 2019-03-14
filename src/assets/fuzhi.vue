<template>
  <div id="app">
   {{msg}}
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {//组件文件用函数，不用object
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style lang="scss">
$background:#cccccc;
body{background: $background;}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

</style>
