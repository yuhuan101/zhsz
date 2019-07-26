<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <slot></slot>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination" v-if="pagination"></div>
  </div>
</template>

<script>
  import 'swiper/dist/css/swiper.css'
  import Swiper from 'swiper'
  export default {
    name: "Slider",
    props: {
      loop: {
        type: Boolean,
        default: true,
      },
      pagination: {
        type: Boolean,
        default: true,
      }
    },
    mounted() {
      this.initSwiper();
    },
    methods: {
      initSwiper() {
        new Swiper ('.swiper-container',{
          loop: this.loop,
          pagination:{
            el:'.swiper-pagination',
            clickable:true,
          },
        })
      }
    }
  }
</script>

<style type="text/css">
  .swiper-pagination-bullet {
    width: 12px;
    height: 12px;
    border-radius: 50%;
  }
  .swiper-pagination {
    text-align: right;
    left: -20px!important;
  }
</style>
<style lang="less" scoped>
  .swiper-container {
    width: 100%;
    height: 100%;
  }
</style>
