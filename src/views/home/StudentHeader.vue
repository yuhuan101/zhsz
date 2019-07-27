<template>
  <div class="header-box">
    <div class="header-fixed flex alignCenter" :style="{'opacity': opacity >= 1 ? 1 : opacity}">
      <div class="avatar">
        <img src="/static/img/avatar.png">
      </div>
      <div class="name">哈哈</div>
      <div class="medal-txt">三星少年</div>
    </div>
    <div class="header-bg flex" :style="{'opacity': scrollTop == 0 ? 1 : (1 - opacity) <= 0 ? 0 : (1 - opacity)}">
      <div class="avatar">
        <img src="/static/img/avatar.png">
      </div>
      <div class="right">
        <div class="right-top flex alignCenter">
          <div class="name">哈哈</div>
          <div class="medal-txt">三星少年</div>
        </div>
        <div class="right-bottom">一年级(3)班</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "StudentHeader",
    props: ['scrollTop'],
    computed: {
      opacity() {
        let new_opacity = 0;
        new_opacity = (this.scrollTop / 100).toFixed(2);
        return new_opacity;
      },
    },
    methods: {
      _jump(path) {
        this.$router.push({
          path
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .header-box {
    position: relative;

    .header-fixed {
      position: fixed;
      z-index: 1005;
      top: 0;
      left: 0;
      width: 100%;
      height: 154px;
      background-color: #ffffff;

      .avatar {
        width: 90px;
        height: 90px;
        border-radius: 50%;
        margin-left: 32px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .name {
        color: #262627;
        font-size: 48px;
        font-weight: 600;
        margin-left: 20px;
      }
      .medal-txt {
        width: 108px;
        height: 36px;
        line-height: 36px;
        text-align: center;
        color: #ffffff;
        font-size: 20px;
        border-radius: 20px;
        margin-left: 22px;
      }
    }

    .header-bg {
      height: 320px;
      padding: 0 32px;
      background-image: url("./img/student_header_bg.png");
      background-repeat: no-repeat;
      background-size: 100%;
      .avatar {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        margin-top: 60px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .right {
        margin-top: 60px;
        margin-left: 20px;
        .right-top {
          height: 66px;
          .name {
            color: #ffffff;
            font-size: 48px;
            font-weight: 600;
          }
          .medal-txt {
            width: 108px;
            height: 36px;
            line-height: 36px;
            color: #FFFFFF;
            font-size: 20px;
            text-align: center;
            border-radius: 20px;
            margin-left: 16px;
            background-color: #FFB600;
            border: 2px solid #ffffff;
          }
        }
        .right-bottom {
          color: #ffffff;
          font-size: 28px;
          margin-top: 14px;
        }
      }
    }
  }
</style>
