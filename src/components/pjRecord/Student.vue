<template>
  <ul>
    <li class="flex">
      <div class="li_left flex_1">
        <div class="li_left_top flex">
          <div class="name">芦世明</div>
          <div class="content text-overflow ">上课积极发言上课积极发言上课积极发言上课积极发言</div>
        </div>
        <div class="li_left_bottom">{{nowTime | formatDate('hh:mm',true)}}</div>
      </div>
      <div class="li_right">
        <div class="fs-box add-fs flex alignCenter">
          <span>+</span>
          12
        </div>
      </div>
    </li>
    <li class="flex">
      <div class="li_left flex_1">
        <div class="li_left_top flex">
          <div class="name">芦世明</div>
          <div class="content text-overflow">上课打闹</div>
        </div>
        <div class="li_left_bottom">{{nowTime | formatDate}} 由李老师评价</div>
      </div>
      <div class="li_right">
        <div class="fs-box reduce-fs flex alignCenter">
          <span>-</span>
          2
        </div>
      </div>
    </li>
    <li class="flex">
      <div class="li_left flex_1">
        <div class="li_left_top flex">
          <div class="name">芦世明</div>
          <div class="content text-overflow">上课打闹</div>
        </div>
        <div class="li_left_bottom">{{nowTime | formatDate}} 由李老师评价</div>
      </div>
      <div class="li_right">
        <div class="fs-box reduce-fs flex alignCenter">
          <span>-</span>
          2
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
  export default {
    name: "Student",
    data() {
      return {
        nowTime: new Date().getTime(),
      }
    }
  }
</script>

<style lang="less" scoped>
  li {
    padding: 32px 0 38px 0;
    border-bottom: 1px solid #EFF1F3;

    .li_left_top {
      div {
        font-size: 30px;
        font-weight: 600;
      }
      .name {
        color: #FFB600;
        margin-right: 16px;
      }
      .content {
        color: #262727;
        width: 400px;
      }
    }
    .li_left_bottom {
      color: #B6B8B8;
      font-size: 24px;
      margin-top: 18px;
    }

    .li_right {
      .fs-box {
        height: 100%;
        font-size: 64px;
        font-weight: 600;
        span {
          font-size: 40px;
          margin-top: 20px;
        }
      }
      .add-fs {
        color: #33A5FF;
      }
      .reduce-fs {
        color: #FFB600;
      }
    }
  }
</style>
