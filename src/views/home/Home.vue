<template>
  <div class="home">
    <component :is="cmpName"></component>
  </div>
</template>

<script>
  import TeacherHome from './TeacherHome.vue'
  import StudentHome from './StudentHome.vue'
  export default {
    name: "Home",
    data() {
      return {
        cmpName: 'TeacherHome'
      }
    },
    components: {
      TeacherHome,
      StudentHome
    }
  }
</script>

<style lang="less" scoped>
  .home {
    height: 100%;
  }
</style>
