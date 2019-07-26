<template>
  <div class="pj-wrapper">
    <!--评价维度-->
    <div class="pj-medal">
      <div class="pj-medal-top">
        {{pjwdText}}
        <i class="mintui mintui-back back-icon"></i>
      </div>
      <div class="pj-medal-content">
        <v-pj-tab ref="pjTab" :list="popupTab" :pjMultiPerson="0" :pjList="pjList"></v-pj-tab>
      </div>
    </div>

    <div class="pj-content">
      <div class="pj-header">
        <p class="pj-text">上课认真</p>
      </div>
      <div class="pj-change-number">
        <div class="title">数值</div>
        <div class="input-box">
          <input type="number" placeholder="请输入1~10范围内数字，支持1位小数">
        </div>
      </div>
      <div class="pj-bz">
        <div class="bz-top flex alignCenter">
          <div class="title flex_1">备注(选填)</div>
          <div class="input-number">0/100</div>
        </div>
        <div class="flex">
          <textarea class="flex_1 textarea" placeholder="请输入备注内容" maxlength="100"></textarea>
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
      <div class="pj-gl-student">
        <div class="clear">
          <div class="title fl">关联学生</div>
          <div class="fl switch"><mt-switch v-model="glStudent"></mt-switch></div>
          <div class="add-student" @click="_jump('/addStudent')">
            ＋ 添加学生
          </div>
        </div>
        <ul class="student-list">
          <li class="flex alignCenter" v-for="(item,index) in selectedxsList" :key="index">
            <div class="name text-overflow">克里斯</div>
            <div class="step-box">
              <span class="span-border reduce">-</span>
              <span class="content">{{item.number}}</span>
              <span class="span-border add">+</span>
            </div>
            <div class="del-student">
              <img src="@/assets/img/del.png">
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="flex pj-bottom-box">
      <div class="flex_1 btn gray-btn" @click="back">取消</div>
      <div class="flex_1 btn blue-btn">提交</div>
    </div>

    <!--上传图片-->
    <v-upload-img ref="upload" :imgs="imgs" :maxNumber="maxNumber" @getUplaodFile="getUplaodFile"></v-upload-img>
  </div>
</template>

<script>
  import UploadImg from '@/components/UploadImg.vue'
  import PjTabList from '@/components/pjTab/PjTabList.vue'
  import {mapGetters,} from 'vuex'
  export default {
    name: "PjClass",
    components: {
      'v-pj-tab': PjTabList,
      'v-upload-img': UploadImg,
    },
    data() {
      return {
        title: this.$route.query.title,
        number: 1,
        imgs: [],
        maxNumber: 9, //最大支持上传多少张图片
        glStudent: false, // 是否关联学生
        pjwdText: '全部评价',
        popupTab: [
          {type: 1,name: '加分'},
          {type: 2,name: '减分'}
        ],
        pjList: [
          {'url': 'https://y.gtimg.cn/music/photo_new/T001R300x300M000002Vcz8F2hpBQj.jpg?max_age=2592000','title':'上课认真'},
        ],
      }
    },
    computed: {
      ...mapGetters({
        'selectedxsList': 'info/selectedxsList',
      }),
    },
    mounted() {
      document.title = '评价' + this.title;
    },
    methods: {
      changeMark(type) {
        this.number = type == 'add' ? this.number+1 : this.number-1;
        this.number = this.number <= 0 ? 0 : this.number;
      },
      upload() {
        this.$refs.upload.fileClick();
      },
      getUplaodFile(data) {
        this.imgs = data;
      },
      _jump(path) {
        this.$router.push({
          path,
          query: {
            title: this.title
          },
        })
      },
      back() {
        this.$router.go(-1);
      }
    }
  }
</script>

<style type="text/css">
  .pj-wrapper .mint-switch-core {
    width: 100px;
    height: 44px;
    border-radius: 22px;
  }
  .pj-wrapper .mint-switch-core:after, .pj-wrapper .mint-switch-core:before {
    top: -2px
  }
   .pj-wrapper .mint-switch-core:before {
     width: 100px;
     height: 44px;
     border-radius: 22px;
  }
  .pj-wrapper .mint-switch-core:after {
    width: 44px;
    height: 44px;
    border-radius: 50%;
  }
  .pj-wrapper .mint-switch-input:checked+.mint-switch-core:after{
    transform: translateX(56px);
  }
</style>
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
        height: 40px;
        line-height: 40px;
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
    }
    .title {
      margin-bottom: 16px;
      color: #262627;
      font-size: 28px;
      font-weight: 600;
    }
    .pj-change-number {
      margin-top: 34px;
      .input-box {
        height: 80px;
        border: 2px solid #EFF1F3;
        input {
          width: 90%;
          margin-left: 20px;
          line-height: 75px;
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
      .textarea {
        outline: none;
        resize: none;
        width: 100%;
        height: 212px;
        padding: 14px 20px;
        border: 1px solid #EFF1F3;
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
    .pj-gl-student {
      position: relative;
      margin: 40px 0 170px 0;
      .switch {
        margin-left: 20px;
      }
      .add-student {
        position: absolute;
        right: 0;
        color: #33A5FF;
        font-size: 28px;
      }
      .student-list {
        border-radius: 16px;
        background-color: #F3F5F7;
        li {
          padding: 20px 0 20px 40px;
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
            background-color: #ffffff;
          }
          .content {
            width: 104px;
            text-align: center;
            color: #262627;
            font-size: 28px;
          }
        }
        .del-student {
          margin-left: 20px;
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
