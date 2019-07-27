<template>
  <div class="student-home">
    <!--首页头部-->
    <v-student-header ref="header" :scrollTop="scrollTop"></v-student-header>
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
              <div class="task-bottom">时间：2019/01/06-2019/07/15</div>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="task-item">
              <div class="task-top flex alignCenter">
                <div class="task-title flex_1 text-overflow">七彩水滴奖章七彩水滴奖章(15枚)</div>
                <div class="task_label">我上传的</div>
              </div>
              <div class="task-icon">2</div>
              <div class="task-bottom">时间：2019/01/06-2019/07/15</div>
            </div>
          </div>
        </v-slider>
      </div>

      <!--审核提示-->
      <div class="sh-tip-box flex alignCenter">
        <div class="flex_1 tip">
          您的任务已经评价
          <span class="yellow-text">&nbsp;前去查看</span>
          <img class="icon-right" src="./img/icon_right_student.png">
        </div>
        <div class="icon-del">
          <img src="./img/icon_del_student.png">
        </div>
      </div>

      <!--勋章墙-->
      <div class="medal-box">
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
      </div>

      <!--排行榜-->
      <div class="ranking-list">
        <div class="time-box flex alignCenter">
          <i class="mintui mintui-back icon icon-left"></i>
          <div class="flex_1 time">06/24-06/30 (本周)排行榜</div>
          <i class="mintui mintui-back icon icon-right"></i>
        </div>
        <div class="ranking-me flex alignCenter">
          <div class="li_left flex alignCenter flex_1">
            <div class="ranking number">4</div>
            <div class="avatar">
              <img src="/static/img/avatar.png">
            </div>
            <div class="name">我</div>
          </div>
          <div class="li_right"><span>26</span></div>
        </div>
        <ul class="list">
          <li class="flex alignCenter" @click="_jump('/studenthome')">
            <div class="li_left flex alignCenter flex_1">
              <div class="ranking">
                <img src="./img/icon_guanjun.png">
              </div>
              <div class="avatar">
                <img src="/static/img/avatar.png">
              </div>
              <div class="name">王弥明</div>
            </div>
            <div class="li_right">
              <span>26</span>
            </div>
          </li>
        </ul>
        <div class="look" @click="_jump('/classmate')">查看班级全部同学</div>
      </div>
    </div>
  </div>
</template>

<script>
  import StudentHeader from './StudentHeader.vue'
  import Slider from '@/components/Slider.vue'
  import MedalWall from '@/components/MedalWall.vue'
  export default {
    name: "StudentHome",
    components: {
      'v-student-header': StudentHeader,
      'v-medal-wall': MedalWall,
      'v-slider': Slider
    },
    data() {
      return {
        scrollTop: 0, // 控制头部显隐
        queryLoading: true,
        moreLoading: false, // 若为真，则无限滚动不会被触发
        allLoaded: false,
        page_number: 1,
        page_count: 10,
        list: ['1','2','3','4','5','7','8','9','10'],
        timeText: '06/24-06/30 (本周)排行榜',
      }
    },
    activated() {
      console.log(1)
    },
    mounted() {
      console.log(2)
    },
    methods: {
      _jump(path) {
        this.$router.push({
          path,
          query: {
            title: this.timeText
          },
        })
      }
    }
  }
</script>

<style lang="less"  scoped>
  .student-home {
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
          .yellow-text {
            color: #FF7B12;
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
      .medal-box {
        padding: 0 32px;
        .medal-list {
          padding: 0 50px;
          .medal-item {
            width: 120px;
            text-align: center;
            margin-right: 30px;
            margin-bottom: 32px;
            &.marginRight0 {
              margin-right: 0;
            }
            img {
              width: 90px;
              height: 90px;
              border-radius: 50%;
            }
            p {
              width: 120px;
              color: #262727;
              font-size: 24px;
              margin-top: 8px;
            }
          }
        }
      }
      .ranking-list {
        border-radius: 20px;
        margin: 0 32px;
        box-shadow: 0 6px 18px rgba(86,104,119,0.15);
        .time-box {
          height: 76px;
          .icon {
            display: inline-block;
            width: 80px;
            height: 100%;
            line-height: 76px;
            text-align: center;
            color: #C7C7CC;
            font-size: 30px;
          }
          .icon-right {
            transform: rotate(-180deg);
          }
          .time {
            color: #262627;
            font-size: 36px;
            font-weight: 600;
            text-align: center;
          }
        }
        .ranking {
          width: 46px;
          height: 64px;
        }
        .number {
          color: #262727;
          font-size: 36px;
          text-align: center;
        }
        .avatar {
          width: 80px;
          height: 80px;
          margin-left: 40px;
        }
        .name {
          color: #262727;
          font-size: 28px;
          margin-left: 20px;
        }
        .li_right {
          span {
            color: #33A5FF;
            font-size: 36px;
            margin-right: 10px;
          }
        }
        .ranking-me {
          height: 150px;
          padding-left: 26px;
          padding-right: 32px;
          background-image: url(./img/my_ranking.png);
          background-repeat: no-repeat;
          background-size: 100% 150px;
          img {
            width: 100%;
            height: 100%;
          }
          .number {
            color: #FFFFFF;
            font-size: 36px;
          }
          .name {
            color: #ffffff;
            font-size: 28px;
          }
          .li_right {
            span {
              color: #ffffff;
            }
          }
        }
        .list {
          padding-left: 26px;
          padding-right: 32px;
          li {
            height: 120px;
            img {
              width: 100%;
              height: 100%;
            }
          }
        }
        .look {
          margin: 0 32px;
          color: #B6B8B8;
          font-size: 28px;
          height: 78px;
          line-height: 78px;
          text-align: center;
          border-top: 1px solid #EFF1F3;
        }
      }
    }
  }
</style>
