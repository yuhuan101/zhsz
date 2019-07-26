<template>
  <mt-popup v-model="popupVisible" position="bottom" class="mint-popup">
    <div class="wd-box">
      <div class="wd-header">
        全部
        <span class="close">×</span>
      </div>
      <div class="wd-content">
        <div class="wd-tab">
          <ul class="tab">
            <li class="tab-item" :class="{'active': tabKey == index}" v-for="(item,index) in tabList" :key="index">{{item.name}}</li>
          </ul>
        </div>
        <div class="tab-content">
          <ul>
            <li class="flex alignCenter" v-for="(item,index) in wdList" :key="index" @click="getWdList(item.name,item.key)">
              <div class="name flex_1">{{item.name}}</div>
              <i class="mintui mintui-back back-icon"></i>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </mt-popup>
</template>

<script>
  export default {
    name: "WdSelect",
    data() {
      return {
        popupVisible: false,
        tabKey: 0,
        tabList: [{name:'请选择'}],
        wdList: [
          {value:1,name:'礼仪少年',key:0},
          {value:2,name:'守纪少年',key:0},
          {value:3,name:'担当少年',key:0},
          {value:4,name:'志愿少年',key:0},
        ], // 存放当前维度的数据
        list: [], // 存放所有维度的数据
      }
    },
    methods: {
      show() {
        this.popupVisible = true;
      },
      hide() {
        this.popupVisible = false;
      },
      getWdList(name,key) {
        this.tabList[key].name = name;
      }
    }
  }
</script>

<style lang="less" scoped>
  .mint-popup-bottom {
    border-radius: 40px 40px 0 0;
  }
  .wd-box {
    height: 674px;
    border-radius: 40px 40px 0 0;
    background-color: #ffffff;
    .wd-header {
      position: relative;
      height: 98px;
      line-height: 98px;
      text-align: center;
      color: #262627;
      font-size: 36px;
      .close {
        position: absolute;
        right: 0;
        top: 0;
        width: 100px;
        height: 100%;
        color: #C7C7CC;
      }
    }
    .wd-content {
      padding-left: 60px;
      padding-right: 66px;
      overflow-x: hidden;
      .wd-tab {
        height: 60px;
        overflow-y: hidden;
        border-bottom: 2px solid #EFF1F3;
        .tab {
          height: 80px;
          line-height: 50px;
          color: #B6B8B8;
          font-size: 28px;
          display: -webkit-box;
          white-space: nowrap;
          overflow-x: scroll;
          overflow-y: hidden;
          -webkit-overflow-scrolling: touch;
          .tab-item {
            display: inline-block;
            margin-right: 70px;
            &.active {
              color: #262727;
              border-bottom: 4px solid #33A5FF;
            }
          }
        }
      }
      .tab-content {
        height: 520px;
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
        li {
          height: 120px;
        }
        .name {
          color: #262727;
          font-size: 40px;
        }
        .back-icon {
          width: 30px;
          color: #B6B8B8;
          transform: rotate(-180deg);
        }
      }
    }
  }
</style>
