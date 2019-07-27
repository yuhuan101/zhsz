<template>
  <div class="medal-wall">
    <div class="wall-top">
      <img src="/static/img/wall-top.png">
    </div>
    <div class="wall-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "MedalWall"
  }
</script>

<style lang="less" scoped>
  .medal-wall {
    position: relative;
    width: 100%;
    height: 570px;
    margin-top: 54px;
    padding-top: 66px;
    background-image: url(/static/img/wall.png);
    background-repeat: no-repeat;
    background-size: 100% 584px;
    .wall-top {
      position: absolute;
      width: 202px;
      height: 118px;
      top: -34px;
      left: 50%;
      margin-left: -101px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .wall-content {
      height: calc(100% - 66px);
    }
  }
</style>
