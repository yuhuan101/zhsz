<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style lang="less">
  @import '../static/less/app.less'; // 全局自定义的css样式
  @import '../static/less/transition.less';
</style>
