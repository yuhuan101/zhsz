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
        <div class="time-box flex alignCenter">
          <i class="mintui mintui-back icon icon-left"></i>
          <div class="flex_1 time">06/24-06/30 (本周)排行榜</div>
          <i class="mintui mintui-back icon icon-right"></i>
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
              <i class="mintui mintui-back back-icon"></i>
            </div>
          </li>
          <li class="flex alignCenter">
            <div class="li_left flex alignCenter flex_1">
              <div class="ranking">
                <img src="./img/icon_yajun.png">
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
          <li class="flex alignCenter">
            <div class="li_left flex alignCenter flex_1">
              <div class="ranking">
                <img src="./img/icon_jijun.png">
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
          <li class="flex alignCenter">
            <div class="li_left flex alignCenter flex_1">
              <div class="ranking number">4</div>
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
          <li class="flex alignCenter">
            <div class="li_left flex alignCenter flex_1">
              <div class="ranking number">5</div>
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
        <div class="look" @click="_jump('/classmate')">查看班级全部同学</div>
      </div>
    </div>
    <!--评价详情-->
    <div class="pj-list">
      <v-record-list :pjType="pjType" :pjTabList="pjTabList"></v-record-list>
    </div>

    <!--选择器-->
    <mt-popup v-model="popupVisible" v-roll:visible=popupVisible position="bottom" class="mint-popup">
      <mt-picker :slots="dataList"  :visible-item-count="5" :show-toolbar="true"  ref="picker" value-key="name" :itemHeight="40">
        <div class="flex">
          <div class="picker-btn picker-cancel" @click="popupVisible = false">取消</div>
          <div class="picker-title"></div>
          <div class="picker-btn picker-sure" @click="onConfirm">完成</div>
        </div>
      </mt-picker>
    </mt-popup>
  </div>
</template>

<script>
  import RecordList from '@/components/pjRecord/RecordList.vue'
  export default {
    name: "ClassDT",
    data() {
      return {
        type: 1, // 1,学生，2，班级
        searchTime: '按学期',
        popupVisible: false,
        pjType: 'student',
        pjTabList: [
          {type: 1,name: '全部'},
          {type: 2,name: '加分'},
          {type: 3,name: '减分'},
          {type: 4,name: '奖励勋章'},
          {type: 5,name: '扣除勋章'}
        ], // 默认显示学生的评价详情
        timeList: [
          {type: 1,name: '按学期'},
          {type: 2,name: '按周'},
          {type: 3,name: '按月'},
        ],
        timeText: '06/24-06/30 (本周)排行榜',
      }
    },
    computed: {
      dataList () {
        let dateSlots = [
          {
            flex: 1,
            values: this.timeList,
            className: 'slot1',
            textAlign: 'center'
          }
        ];
        return  dateSlots
      },
    },
    components: {
      'v-record-list': RecordList
    },
    methods: {
      _tab1(type) {
        this.type = type;
        if (type == 1) {
          this.pjType = 'student';
          this.pjTabList = [
            {type: 1,name: '全部'},
            {type: 2,name: '加分'},
            {type: 3,name: '减分'},
            {type: 4,name: '奖励勋章'},
            {type: 5,name: '扣除勋章'}
          ]
        } else {
          this.pjType = 'class';
          this.pjTabList = [
            {type: 1,name: '全部'},
            {type: 2,name: '加分'},
            {type: 3,name: '减分'}
          ]
        }
      },
      onConfirm() {

      },
      _jump(path) {
        this.$router.push({
          path,
          query: {
            title: this.timeText,
          },
        });
      }
    }
  }
</script>

<style lang="less" scoped>
  .class-dt {
    height: 100%;
    padding: 0 32px;
    background-color: #FFFFFF;
    overflow-x: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    background-image: url(./img/dt_bg.png);
    background-repeat: no-repeat;
    background-size: 100% 349px;

    .ranking-top {
      position: relative;
      margin-top: 36px;
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
      margin-top: 30px;
      border-radius: 20px;
      background-color: #FFFFFF;
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
      .list {
        margin: 0 26px;
        border-top: 1px solid #EFF1F3;
        border-bottom: 1px solid #EFF1F3;
        li {
          height: 100px;
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
      .look {
        color: #B6B8B8;
        font-size: 28px;
        height: 78px;
        line-height: 78px;
        text-align: center;
      }
    }
    .pj-list {
      margin-top: 40px;
      border-radius: 20px;
      background-color: #ffffff;
      box-shadow: 0 6px 18px rgba(86,104,119,0.15);
    }
  }
</style>
