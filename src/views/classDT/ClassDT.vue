<template>
  <div class="class-dt">
    <!--排行榜-->
    <div class="ranking-list">
      <div class="ranking-top">
        <div class="tab-box1 clear">
          <div class="tab-item1 fl" @click="_tab1(1)">学生</div>
          <div class="tab-item1 fl" @click="_tab1(2)">班级</div>
          <span :class="{'span_left0': type == 1, 'span_left100': type == 2}">{{type == 1 ? '学生' : '班级'}}</span>
        </div>
        <div class="search-box" @click="popupVisible=true">
          <span>{{searchTime}}</span>
          <img src="/static/img/icon_down_black.png">
        </div>
      </div>
      <div class="ranking-content">
        <div class="time-box"></div>
        <ul class="list">
          <li class="flex alignCenter">
            <div class="li_left flex alignCenter flex_1">
              <div class="ranking guanjun">
                <img src="./img/icon_guanjun.png">
              </div>
              <div class="avatar">
                <img src="/static/img/avatar.png">
              </div>
              <div class="name">王弥明</div>
            </div>
            <div class="li_right">
              <span>26</span>
              <i class="mintui mintui-back back-icon"></i>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ClassDT",
    data() {
      return {
        type: 1, // 1,学生，2，班级
        searchTime: '按学期',
        popupVisible: false
      }
    },
    methods: {
      _tab1(type) {
        this.type = type;
      },
    }
  }
</script>

<style lang="less" scoped>
  .class-dt {
    height: 100%;
    padding: 36px 32px;
    background-color: #FFFFFF;
    overflow-x: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;

    .ranking-top {
      position: relative;
      .tab-box1 {
        position: relative;
        width: 200px;
        height: 48px;
        border-radius: 24px;
        cursor: pointer;
        background-color: #FFFFFF;
        border-bottom: 1px solid #EFF1F3;
        .tab-item1 {
          width: 50%;
          line-height: 48px;
          text-align: center;
          color: #262727;
          font-size: 28px;
        }
        .active {
          color: #ffffff;
        }
        span {
          position: absolute;
          top: 0;
          width: 100px;
          height: 48px;
          line-height: 48px;
          color: #ffffff;
          font-size: 28px;
          text-align: center;
          border-radius: 24px;
          background-color: #FFB600;
          transition: all .2s;
        }
        .span_left0 {
          left: 0;
        }
        .span_left100 {
          left: 100px
        }
      }
      .search-box {
        position: absolute;
        right: 0;
        top: 0;
        span {
          color: #262727;
          font-size: 28px;
        }
        img {
          display: inline-block;
          vertical-align: top;
          width: 33px;
          height: 28px;
          margin-top: 5px;
          margin-left: 15px;
        }
      }
    }
    .ranking-content {
      padding: 0 26px;
      margin-top: 30px;
      border-radius: 20px;
      background-color: #FFFFFF;
      box-shadow: 0 6px 18px rgba(86,104,119,0.15);
      .time-box {
        height: 76px;
      }
      .list {
        border-top: 1px solid #EFF1F3;
        border-bottom: 1px solid #EFF1F3;
        li {
          height: 100px;
         .ranking {
           width: 46px;
           height: 64px;
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
            .back-icon {
              display: inline-block;
              vertical-align: top;
              margin-top: 10px;
              color: #C7C7CC;
              transform: rotate(-180deg);
            }
          }
        }
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
</style>
