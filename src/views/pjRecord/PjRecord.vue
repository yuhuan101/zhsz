<template>
  <div>
    <div class="record-top">
      <div class="search-box" @click="popupVisible=true">
        <span>{{searchTime}}</span>
        <img src="./img/icon_down.png">
      </div>
    </div>
    <!--图表统计-->
    <div class="section record-echarts">
      <div class="echarts-top">06/24-06/30 (本周)</div>
      <div class="flex">
        <div class="echarts-left flex_1">
          <v-pie ref="pie"></v-pie>
        </div>
        <div class="echarts-right flex_1">
          <div class="right-item">
            <span class="dot add-dot"></span>
            <span>加分: 30次，共215分</span>
          </div>
          <div class="right-item">
            <span class="dot add-dot"></span>
            <span>加分: 30次，共215分</span>
          </div>
          <div class="right-item">
            <span class="dot add-dot"></span>
            <span>加分: 30次，共215分</span>
          </div>
          <div class="right-item">
            <span class="dot add-dot"></span>
            <span>加分: 30次，共215分</span>
          </div>
        </div>
      </div>
    </div>
    <!--评价详情-->
    <v-record-list :pjType="'teacher'"></v-record-list>
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
  import Pie from '@/components/echarts/Pie.vue'
  export default {
    name: "PjRecord",
    components: {
      'v-record-list': RecordList,
      'v-pie': Pie
    },
    data() {
      return {
        popupVisible: false,
        searchTime: '按学期',
        timeList: [
          {type: 1,name: '按学期'},
          {type: 2,name: '按周'},
          {type: 3,name: '按月'},
        ]
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
    methods: {
      onConfirm() {

      }
    }
  }
</script>

<style lang="less" scoped>
  .record-top {
    height: 96px;
    line-height: 96px;

    .search-box {
      width: 200px;
    }
    span {
      color: #3094E2;
      font-size: 28px;
      margin-right: 16px;
    }
    img {
      display: inline-block;
      width: 33px;
      height: 28px;
      vertical-align: top;
      margin-top: 34px;
    }
  }
  .section {
    background-color: #FFFFFF;
    border-radius: 20px;
  }
  .record-echarts {
    height: 376px;
    box-shadow: 0 6px 18px rgba(86,104,119,0.15);
    .echarts-top {
      height: 76px;
      line-height: 76px;
      text-align: center;
    }
    .echarts-right {
      .right-item {
        height: 40px;
        line-height: 40px;
        color: #B6B8B8;
        font-size: 24px;
        .dot {
          display: inline-block;
          vertical-align: middle;
          width: 12px;
          height: 12px;
          margin-right: 10px;
          border-radius: 50%;
        }
        .add-dot {
          background-color: #33A5FF;
        }
      }
    }
  }
</style>
