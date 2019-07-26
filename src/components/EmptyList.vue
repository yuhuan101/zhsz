<template>
  <div class="empty-box">
    <div class="flex justifyCenter empty-top">
      <img src="@/assets/img/empty.png">
    </div>
    <div class="empty-bottom">{{text}}</div>
  </div>
</template>

<script>
  export default {
    name: "EmptyList",
    props: ['text'],
  }
</script>

<style lang="less" scoped>
  .empty-box {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    text-align: center;
    .empty-top {
      margin-top: 184px;
      width: 100%;
      img {
        width: 547px;
        height: 402px;
      }
    }
    .empty-bottom {
      color: #666666;
      font-size: 32px;
      margin-top: 46px;
    }
  }
</style>
