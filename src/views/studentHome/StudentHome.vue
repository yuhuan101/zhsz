<template>
  <div class="student-home-page">
    <div class="header flex alignCenter">
      <div class="avatar">
        <img src="/static/img/avatar.png" >
      </div>
      <div class="name">刘洋</div>
      <div class="medal">三星少年</div>
    </div>
    <!--勋章墙-->
    <v-medal-wall>
      <v-slider ref="slider" :loop="false">
        <div class="swiper-slide">
          <div class="medal-list clear">
            <div class="medal-item fl" :class="{'marginRight0': (index+1) % 4 == 0}" v-for="(item,index) in 12">
              <img src="https://y.gtimg.cn/music/photo_new/T001R300x300M000001fNHEf1SFEFN.jpg?max_age=2592000">
              <p>维度</p>
            </div>
          </div>
        </div>
      </v-slider>
    </v-medal-wall>
    <!--评价-->
    <div class="pj-box">
      <div class="pj-top">评价</div>
      <div class="pj-record-box">
        <v-record-list ref="pjRecord" :type="'student'"></v-record-list>
      </div>
    </div>
  </div>
</template>

<script>
  import MedalWall from '@/components/MedalWall.vue'
  import Slider from '@/components/Slider.vue'
  import RecordList from '@/components/pjRecord/RecordList.vue'
  export default {
    name: "StudentHome",
    components: {
      'v-medal-wall': MedalWall,
      'v-slider': Slider,
      'v-record-list': RecordList,
    },
  }
</script>

<style lang="less" scoped>
  .student-home-page {
    position: relative;
    height: 100%;
    padding: 0 32px;
    background-color: #ffffff;
    overflow-x: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    background-image: url(/static/img/mask.png);
    background-repeat: no-repeat;
    background-size: 100% 400px;

    .header {
      margin-top: 40px;
      .avatar {
        width: 100px;
        height: 100px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .name {
        color: #262627;
        font-size: 48px;
        font-weight: 600;
        margin: 0 16px;
      }
      .medal {
        width: 108px;
        height: 36px;
        line-height: 36px;
        color: #ffffff;
        font-size: 20px;
        text-align: center;
        background-color: #FFB600;
        border-radius: 20px;
      }
    }
    .medal-list {
      padding: 0 60px;
      .medal-item {
        width: 90px;
        text-align: center;
        margin-right: 68px;
        margin-bottom: 28px;
        &.marginRight0 {
          margin-right: 0;
        }
        img {
          width: 90px;
          height: 90px;
          border-radius: 50%;
        }
        p {
          color: #CC7B1E;
          font-size: 28px;
          font-weight: 600;
          margin-top: 8px;
        }
      }
    }
    .pj-box {
      position: relative;
      border-top: 2px solid #FFB600;
      .pj-top {
        position: absolute;
        width: 157px;
        height: 60px;
        line-height: 60px;
        top: -30px;
        left: 50%;
        margin-left: -78.5px;
        color: #ffffff;
        font-size: 32px;
        font-weight: 600;
        text-align: center;
        background-image: url(./img/pj-bg.png);
        background-repeat: no-repeat;
        background-size: 100% 60px;
      }
    }
  }
</style>
