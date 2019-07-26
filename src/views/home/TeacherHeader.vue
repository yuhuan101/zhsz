<template>
  <div class="header-box">
    <div class="header-fixed flex alignCenter" :style="{'opacity': opacity >= 1 ? 1 : opacity}">
      <div class="name flex_1">{{timeZH}}，张三老师</div>
      <div class="icon-box marginRight32">
        <img src="./img/icon_record2.png" @click="_jump('/pjrecord')">
        <img src="./img/icon_scan2.png">
      </div>
    </div>
    <div class="header-bg" :style="{'opacity': scrollTop == 0 ? 1 : (1 - opacity) <= 0 ? 0 : (1 - opacity)}">
      <div class="header-bg-top flex alignCenter">
        <div class="name flex_1">{{timeZH}}，张三老师</div>
        <div class="icon-box">
          <img src="./img/icon_record.png">
          <img src="./img/icon_scan.png">
        </div>
      </div>
      <div class="pj_cs">今日已评价12次</div>
      <div class="search-tj" @click="_toggle">
        {{text}}
        <i class="mintui mintui-back back-icon" :class="{ 'up': isToggle }"></i>
      </div>
    </div>

    <!--年级选择器-->
    <mt-popup v-model="popupVisible" v-roll:visible=popupVisible position="bottom" class="mint-popup">
      <mt-picker :slots="dataList"  :visible-item-count="5" :show-toolbar="true"  ref="picker" value-key="kmmc" :itemHeight="40">
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
  export default {
    name: "TeacherHeader",
    props: ['scrollTop'],
    data() {
      return {
        isToggle: false,
        popupVisible: false,
        text: '全部年级',
        njList: [],
        nowHours: new Date().getHours(),
      }
    },
    computed: {
      opacity() {
        let new_opacity = 0;
        new_opacity = (this.scrollTop / 100).toFixed(2);
        return new_opacity;
      },
      dataList () {
        let dateSlots = [
          {
            flex: 1,
            values: this.njList,
            className: 'slot1',
            textAlign: 'center'
          }
        ];
        return  dateSlots
      },
      timeZH() {
        let text = '';
        if (this.nowHours >= 5 && this.nowHours < 9) {
          text = '早安'
        }else if (this.nowHours >= 9 && this.nowHours < 12) {
          text = '上午好'
        } else if (this.nowHours >= 12 && this.nowHours < 18) {
          text = '下午好'
        } else {
          text = '晚上好'
        }
        return text;
      }
    },
    methods: {
      _toggle() {
        // this.isToggle = !this.isToggle;
        this.popupVisible = true;
      },
      onConfirm() {
        let subjectSelected = this.$refs.picker.getValues()[0];
        console.log(subjectSelected);
        this.popupVisible = false
      },
      _jump(path) {
        this.$router.push({
          path
        })
      }
    },
  }
</script>

<style lang="less" scoped>
  .header-box {
    position: relative;

    .header-bg {
      height: 349px;
      padding: 0 32px;
      background-image: url("./img/header_bg.png");
      background-repeat: no-repeat;
      background-size: 100%;

      .header-bg-top {
        padding-top: 32px;
      }
      .name {
        font-size: 40px;
        color: #fff;
        font-weight: 600;
      }
      .pj_cs {
        font-size: 28px;
        color: #fff;
        margin-top: 8px;
      }
      .search-tj {
        margin-top: 20px;
        font-size: 28px;
        color: #ffffff;

        .back-icon {
          font-size: 25px;
          display: inline-block;
          width: 25px;
          margin-left: 10px;
          transform: rotate(-90deg);
          transform-origin: center;
          transition: all .5s;
        }
        .up {
          transform: rotate(90deg);
        }
      }
    }
    .header-fixed {
      position: fixed;
      z-index: 1005;
      top: 0;
      left: 0;
      width: 100%;
      height: 138px;
      background: rgba(255,255,255,.8);

      .name{
        color: #262727;
        font-size: 40px;
        font-weight: 600;
        margin-left: 32px;
      }
    }
    .icon-box {
      img {
        width: 58px;
        height: 58px;
        cursor: pointer;
      }
      img:nth-child(2){
        margin-left: 30px;
      }
    }
    .marginRight32 {
      margin-right: 32px;
    }
  }
</style>
