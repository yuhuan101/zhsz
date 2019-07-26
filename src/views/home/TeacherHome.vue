<template>
  <div class="teacher-home" ref="viewBox">
    <!--首页头部-->
    <v-teacher-header ref="header" :scrollTop="scrollTop"></v-teacher-header>

    <div class="content">
      <!--任务-->
      <div class="task-box">
        <v-slider ref="slider" :pagination="true">
          <div class="swiper-slide">
            <div class="task-item">
              <div class="task-top flex alignCenter">
                <div class="task-title flex_1 text-overflow">七彩水滴奖章七彩水滴奖章(15枚)</div>
                <div class="task_label">我上传的</div>
              </div>
              <div class="task-icon">1</div>
              <div class="task-bottom">完成人数：10/60</div>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="task-item">
              <div class="task-top flex alignCenter">
                <div class="task-title flex_1 text-overflow">七彩水滴奖章七彩水滴奖章(15枚)</div>
                <div class="task_label">我上传的</div>
              </div>
              <div class="task-icon">2</div>
              <div class="task-bottom">完成人数：10/60</div>
            </div>
          </div>
        </v-slider>
      </div>

      <!--审核提示-->
      <div class="sh-tip-box flex alignCenter">
        <div class="flex_1 tip">
          您有<span class="blue-text"> 5 </span>条任务未审核
          <span class="blue-text">&nbsp;前去审核</span>
          <img class="icon-right" src="./img/icon_right.png">
        </div>
        <div class="icon-del">
          <img src="./img/icon_del.png">
        </div>
      </div>

      <!--班级列表-->
      <v-class-list ref="classList" :jlk="jlk" v-if="!jlk"></v-class-list>
      <!--班级列表--激励卡-->
      <v-class-list-jlk ref="classList" :jlk="jlk" v-else></v-class-list-jlk>
    </div>
  </div>
</template>

<script>
  import TeacherHeader from './TeacherHeader.vue'
  import ClassList from './ClassList.vue'
  import ClassList_jlk from './ClassList_jlk.vue' // 激励卡
  import Slider from '@/components/Slider.vue'
  export default {
    name: "TeacherHome",
    components: {
      'v-teacher-header': TeacherHeader,
      'v-class-list': ClassList,
      'v-class-list-jlk': ClassList_jlk,
      'v-slider': Slider
    },
    data() {
      return {
        jlk: false, // 激励卡模块展示
        scrollTop: 0, // 控制头部显隐
        className: '',
      }
    },
    activated() {
      console.log(1)
    },
    mounted() {
      console.log(2)
      this.loadMore()
    },
    methods: {
      loadMore() {
        this.$refs.viewBox.addEventListener('scroll', () => {
          var scrollTop = this.$refs.viewBox.scrollTop;
          this.scrollTop = scrollTop;
          var windowHeight =
            document.documentElement.clientHeight || document.body.clientHeight; //变量scrollHeight是滚动条的总高度
          var scrollHeight = this.$refs.viewBox.scrollHeight; //滚动条到底部的条件
          let h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight; //浏览器高度
          if (scrollTop + windowHeight == scrollHeight) {
            console.log('开始加载')
            this.$refs.classList.getList()
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .teacher-home {
    position: relative;
    height: 100%;
    background-color: #ffffff;
    overflow-x: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;

    .content {
      position: absolute;
      width: 100%;
      z-index: 1000;
      top: 214px;
      left: 0;
      bottom: 0;
      .task-box {
        height: 180px;
        margin: 0 32px 40px 32px;
        border-radius: 20px;
        background-color: #ffffff;
        box-shadow: 0 6px 18px rgba(86,104,119,0.15);
        .task-item {
          position: relative;
          padding: 32px 20px 34px 80px;
          .task-top {
            height: 50px;
            .task-title {
              color: #262627;
              font-size: 36px;
              font-weight: 600;
            }
            .task_label {
              width: 132px;
              height: 48px;
              line-height: 48px;
              color: #33A5FF;
              font-size: 24px;
              text-align: center;
              background-color: #E8F3FF;
              border-radius: 24px;
            }
          }
          .task-icon {
            position: absolute;
            left: 12px;
            top: -12px;
            width: 76px;
            height: 96px;
            line-height: 84px;
            color: #ffffff;
            font-size: 32px;
            text-align: center;
            background-image: url(./img/icon_task.png);
            background-repeat: no-repeat;
            background-size: 76px 96px;
          }
          .task-bottom {
            color: #B6B8B8;
            font-size: 28px;
            margin-top: 24px;
          }
        }
      }
      .sh-tip-box {
        margin: 0 32px 40px 32px;
        height: 100px;
        background-color: #E8F3FF;
        border-radius: 8px;
        padding: 0 32px 0 20px;
        .tip {
          color: #262727;
          font-size: 28px;
          .blue-text {
            color: #33A5FF;
          }
          .icon-right {
            width: 25px;
            height: 17px;
          }
          .icon-del {
            width: 15px;
            height: 15px;
            img {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
    }
  }
</style>
