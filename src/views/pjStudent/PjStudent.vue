<template>
  <div class="pj-wrapper">
    <!--评价维度-->
    <div class="pj-medal">
      <div class="pj-medal-top" @click="showWd">
        {{pjwdText}}
        <i class="mintui mintui-back back-icon"></i>
      </div>
      <div class="pj-medal-content">
        <v-pj-tab ref="pjTab" :list="popupTab" :pjMultiPerson="type" :pjList="pjList"></v-pj-tab>
      </div>
    </div>

    <div class="pj-content">
      <div class="pj-header">
        <p class="pj-text">上课认真</p>
        <p class="py">乐学的学习者-勤学少年</p>
      </div>
      <!--<div class="pj-kc-select">-->
      <!--<div class="title">课程</div>-->
      <!--<div class="kcmc" @click="popupVisible=true">-->
      <!--{{kcmc}}-->
      <!--<i class="mintui mintui-back back-icon"></i>-->
      <!--</div>-->
      <!--</div>-->
      <div class="pj-change-number">
        <div class="title">数值</div>
        <div class="step-box">
          <span class="span-border reduce" @click="changeMark('reduce')">-</span>
          <span class="content">{{number}}</span>
          <span class="span-border add" @click="changeMark('add')">+</span>
        </div>
      </div>
      <div class="pj-bz">
        <div class="bz-top flex alignCenter">
          <div class="title flex_1">评语(选填)</div>
          <div class="input-number">0/100</div>
        </div>
        <div class="py-box">
          <div class="flex">
            <textarea class="flex_1 textarea" placeholder="请输入评语" v-model="py" maxlength="100"></textarea>
          </div>
          <ul class="py-list">
            <li class="text-overflow" @click="setPY">积极预习，认真听讲，勤做笔记，按时完成作业</li>
          </ul>
        </div>
      </div>
      <div class="pj-img-box">
        <div class="title">图片(选填)</div>
        <div class="clear">
          <div class="fl img-item flex alignCenter justifyCenter">
            <div class="del-img-btn">
              <img src="@/assets/img/del.png">
            </div>
            <img class="img" src="https://y.gtimg.cn/music/photo_new/T001R300x300M000000t2qd13dLpae.jpg?max_age=2592000">
            <div class="progress-box"></div>
            <div class="progress-num">20%</div>
          </div>
          <div class="fl upload" @click="upload" v-show="imgs.length < 9">
            <div class="jiahao"></div>
            <div class="tianjia-txt">添加照片</div>
          </div>
        </div>
      </div>
      <!--学生评分-->
      <div class="pf-list" v-if="type == 1">
        <div class="title">学生评分</div>
        <div class="student-list">
          <ul>
            <li class="flex alignCenter">
              <div class="name text-overflow">哈哈</div>
              <div class="step-box">
                <span class="span-border reduce" @click="changeMark('reduce')">-</span>
                <span class="content">{{number}}</span>
                <span class="span-border add" @click="changeMark('add')">+</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="flex alignCenter pj-bottom-box">
        <div class="flex_1 btn gray-btn" @click="back">取消</div>
        <div class="flex_1 btn blue-btn">提交</div>
      </div>
    </div>

    <!--上传图片-->
    <v-upload-img ref="upload" :imgs="imgs" :maxNumber="maxNumber" @getUplaodFile="getUplaodFile"></v-upload-img>

    <!--关联课程选择器-->
    <mt-popup v-model="popupVisible" v-roll:visible=popupVisible position="bottom" class="mint-popup">
      <mt-picker :slots="dataList"  :visible-item-count="5" :show-toolbar="true"  ref="picker" value-key="kmmc" :itemHeight="40">
        <div class="flex">
          <div class="picker-btn picker-cancel" @click="popupVisible = false">取消</div>
          <div class="picker-title"></div>
          <div class="picker-btn picker-sure" @click="onConfirm">完成</div>
        </div>
      </mt-picker>
    </mt-popup>

    <!--维度选择器-->
    <v-wd-select ref="wd"></v-wd-select>
  </div>
</template>

<script>
  import WdSelect from '@/components/wdSelect/WdSelect.vue'
  import UploadImg from '@/components/UploadImg.vue'
  import PjTabList from '@/components/pjTab/PjTabList.vue'
  export default {
    name: "PjStudent",
    components: {
      'v-wd-select': WdSelect,
      'v-pj-tab': PjTabList,
      'v-upload-img': UploadImg,
    },
    data() {
      return {
        title: this.$route.query.title,
        type: this.$route.query.type, // 1,多人评价,0单人
        number: 1,
        imgs: [],
        maxNumber: 9, //最大支持上传多少张图片
        popupVisible: false,
        kcmc: '不关联',
        kcList: [],
        pjwdText: '全部评价',
        popupTab: [
          {type: 1,name: '加分'},
          {type: 2,name: '减分'},
          {type: 3,name: '奖励勋章'},
          {type: 4,name: '扣除勋章'},
        ],
        pjList: [
          {'url': 'https://y.gtimg.cn/music/photo_new/T001R300x300M000002Vcz8F2hpBQj.jpg?max_age=2592000','title':'上课认真'},
        ],
        py: '',
      }
    },
    computed: {
      dataList () {
        let dateSlots = [
          {
            flex: 1,
            values: this.kcList,
            className: 'slot1',
            textAlign: 'center'
          }
        ];
        return  dateSlots
      },
    },
    mounted() {
      if (this.type == 1) { // 多人评价
        let studentInfo = JSON.parse(this.$cookie.get('studentInfo'));
        let title = '';
        studentInfo.forEach((c) => {
          title += c.name + '、' ;
        });
        document.title = '评价' + title;
      } else {
        document.title = '评价' + this.title;
      }
    },
    methods: {
      changeMark(type) {
        this.number = type == 'add' ? (this.number - 0)+(0.1 - 0) : (this.number - 0)-(0.1 - 0);
        this.number = this.number <= 0 ? 0 : this.number.toFixed(1);
      },
      setPY() {
        this.py = '积极预习，认真听讲，勤做笔记，按时完成作业'
      },
      showWd() {
        this.$refs.wd.show();
      },
      upload() {
        this.$refs.upload.fileClick();
      },
      getUplaodFile(data) {
        this.imgs = data;
      },
      onConfirm() {

      },
      back() {
        this.$router.go(-1);
      }
    }
  }
</script>

<style lang="less" scoped>
  .pj-wrapper {
    height: 100%;
    background-color: #EFF1F3;
    overflow-x: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;

    .pj-medal {
      background-color: #ffffff;
      .pj-medal-top {
        width: 200px;
        height: 40px;
        line-height: 40px;
        margin: 0 auto;
        color: #262627;
        font-size: 28px;
        text-align: center;
        padding: 20px 32px 0;
        .back-icon {
          display: inline-block;
          color: #C7C7CC;
          font-size: 25px;
          width: 25px;
          transform: rotate(-90deg);
        }
      }
      .pj-medal-content {
        margin-top: 42px;
      }
    }
    .pj-content {
      margin-top: 20px;
      padding: 32px;
      padding-bottom: 118px;
      background-color: #ffffff;
    }
    .pj-header {
      padding-bottom: 34px;
      border-bottom: 1px solid #EFF1F3;
      .pj-text {
        color: #262627;
        font-size: 32px;
        margin-bottom: 8px;
        font-weight: 600;
      }
      .py {
        color: #B6B8B8;
        font-size: 24px;
      }
    }
    .title {
      margin-bottom: 16px;
      color: #262627;
      font-size: 28px;
      font-weight: 600;
    }
    .pj-kc-select {
      margin-top: 34px;
      .kcmc {
        position: relative;
        height: 88px;
        line-height: 88px;
        color: #B6B8B8;
        font-size: 28px;
        padding-left: 20px;
        border: 1px solid #EFF1F3;
        .back-icon {
          position: absolute;
          right: 32px;
          top: 0;
          font-size: 25px;
          display: inline-block;
          transform: rotate(-90deg);
        }
      }
    }
    .pj-change-number {
      margin-top: 34px;
      .step-box {
        span {
          display: inline-block;
        }
        .span-border {
          cursor: pointer;
          width: 60px;
          height: 60px;
          line-height: 55px;
          color: #B6B8B8;
          font-size: 40px;
          font-weight: 600;
          text-align: center;
          border-radius: 8px;
          border: 2px solid #B6B8B8;
        }
        .content {
          width: 104px;
          text-align: center;
          color: #262627;
          font-size: 28px;
        }
      }
    }
    .pj-bz {
      margin-top: 34px;
      .input-number {
        width: 70px;
        color: #B6B8B8;
        font-size: 28px;
      }
      .py-box {
        border: 2px solid #EFF1F3;
        .textarea {
          outline: none;
          resize: none;
          border: none;
          width: 100%;
          height: 212px;
          padding: 14px 20px;
        }
        .py-list {
          color: #262627;
          font-size: 28px;
          padding: 20px;
          li {
            height: 56px;
            line-height: 56px;
            margin-bottom: 20px;
            padding-left: 20px;
            border-radius: 28px;
            background-color: #EFF1F3;
          }
        }
      }
    }
    .pj-img-box {
      margin-top: 32px;
      .clear {
        padding-top: 20px;
      }
      .upload {
        width: 200px;
        height: 200px;
        cursor: pointer;
        text-align: center;
        border: 1px solid #EFF1F3;
        .jiahao {
          position: relative;
          width: 60px;
          height: 60px;
          top: 38px;
          left: 50%;
          margin-left: -30px;
          &:before {
            content: '';
            position: absolute;
            width: 60px;
            height: 4px;
            top: 50%;
            left: 0;
            margin-top: -2px;
            background-color: #EFF1F3;
          }
          &:after {
            content: '';
            position: absolute;
            height: 60px;
            width: 4px;
            top: 0;
            left: 50%;
            margin-left: -2px;
            background-color: #EFF1F3;
          }
        }
        .tianjia-txt {
          color: #B6B8B8;
          font-size: 24px;
          margin-top: 70px;
        }
      }
      .img-item {
        position: relative;
        width: 200px;
        height: 200px;
        margin-right: 42px;
        .img {
          max-height: 200px;
          max-width: 200px;
        }
        .del-img-btn {
          position: absolute;
          width: 40px;
          height: 40px;
          right: -12px;
          top: -12px;
          cursor: pointer;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .progress-box {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          background-color: rgba(0,0,0,0.5);
        }
        .progress-num {
          position: absolute;
          width: 100px;
          height: 100px;
          line-height: 100px;
          text-align: center;
          top: 50%;
          left: 50%;
          margin-left: -50px;
          margin-top: -50px;
        }
      }
    }
    .pf-list {
      margin-top: 40px;
      padding-top: 34px;
      border-top: 2px solid #EFF1F3;
      .student-list {
        padding: 28px 40px;
        background-color: #F3F5F7;
        li {
          margin-bottom: 40px;
          &.marginBottom0 {
            margin-bottom: 0;
          }
        }
        .name {
          width: 180px;
          color: #262727;
          font-size: 32px;
        }
        .step-box {
          span {
            display: inline-block;
          }
          .span-border {
            cursor: pointer;
            width: 60px;
            height: 60px;
            line-height: 55px;
            color: #B6B8B8;
            font-size: 40px;
            font-weight: 600;
            text-align: center;
            border-radius: 8px;
            border: 2px solid #B6B8B8;
          }
          .content {
            width: 104px;
            text-align: center;
            color: #262627;
            font-size: 28px;
          }
        }
      }
    }
    .pj-bottom-box {
      position: fixed;
      width: 100%;
      bottom: 0;
      left: 0;
      height: 100px;
      background-color: #ffffff;
      .btn {
        height: 88px;
        line-height: 88px;
        text-align: center;
        border-radius: 44px;
        font-size: 28px;
      }
      .gray-btn {
        margin-left: 32px;
        margin-right: 46px;
      }
      .blue-btn {
        margin-right: 32px;
      }
    }
  }
</style>
