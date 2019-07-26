<template>
  <div class="jlk-tab">
    <div class="tab flex">
      <div class="item" v-for="(item,index) in list" :key="index">
        <span :class="{'active': popupKey == item.type}" v-preventReClick="1000" @click.prevent="popupTabFun($event,item.type)">{{item.name}}</span>
      </div>
    </div>
    <div class="tab-content" v-show="popupKey == 1">
      <ul class="list-box clear">
        <li class="fl" :class="{'marginRight0': (index+1)%4 == 0}" v-for="(item,index) in pjList" :key="index">
          <img :src="item.url">
          <p>{{item.title}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: "PjTabListjlk",
    props: ['list','pjList','pjMultiPerson'],
    data() {
      return {
        popupKey: 1,
      }
    },
    methods: {
      popupTabFun(e,type) {
        if (e.target.disabled) {
          return;
        }
        this.popupKey = type;
        this.$emit('getjlkType',type)
      },
    }
  }
</script>

<style lang="less" scoped>
  .jlk-tab {
    .tab {
      height: 80px;
      .item {
        width: 50%;
        text-align: center;
        span {
          color: #B6B8B8;
          font-size: 30px;
        }
        span.active {
          position: relative;
          color: #262627;
          font-weight: 600;

          &:after {
            content: '';
            position: absolute;
            width: 80%;
            height: 5px;
            border-radius: 2px;
            bottom: -15px;
            left: 50%;
            margin-left: -40%;
            background-color: #33A5FF;
          }
        }
      }
    }
    .tab-content {
      max-height: 408px;
      overflow-x: hidden;
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
      .list-box {
        padding: 40px 0 38px 62px;
        li {
          margin-bottom: 34px;
          margin-right: 82px;
          color: #262627;
          font-size: 24px;
          text-align: center;
          &.marginRight0 {
            margin-right: 0;
          }
          img {
            width: 126px;
            height: 84px;
            border-radius: 8px;
          }
          p {
            color: #262627;
            font-size: 24px;
            margin-top: 14px;
          }
        }
      }
    }
  }
</style>
