<template>
  <div class="zhsz-wrapper">
    <div class="content">
      <keep-alive>
        <router-view />
      </keep-alive>
    </div>
    <div class="bottom">
      <ul class="flex">
        <li class="flex_1" :class="{'active': path == '/zhsz/home'}" @click="jump('/zhsz/home')">
          <span class="icon-home"></span>
          <p>首页</p>
        </li>
        <li class="flex_1" :class="{'active': path == '/zhsz/task'}" @click="jump('/zhsz/task')">
          <span class="icon-task"></span>
          <p>任务</p>
        </li>
        <li class="flex_1" :class="{'active': path == '/zhsz/pjrecord'}" @click="jump('/zhsz/pjrecord')">
          <span class="icon-record"></span>
          <p>纪录</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Index",
    data() {
      return {
        path: '/zhsz/home'
      }
    },
    mounted() {
    },
    methods: {
      jump(path) {
        this.path = path;
        this.$router.push({
          path
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .zhsz-wrapper {
    height: 100%;
    position: relative;
    background-color: #FFFFFF;

    .content {
      height: calc(100% - 116px);
    }
    .bottom {
      position: fixed;
      width: 686px;
      height: 116px;
      left: 50%;
      bottom: 0;
      margin-left: -343px;
      border-radius: 20px;
      background-color: #FFFFFF;
      box-shadow: 0 6px 18px rgba(86,104,119,0.15);

      li {
        text-align: center;
        font-size: 24px;
        color: #B6B8B8;
        margin-top: 10px;
        cursor: pointer;
        span {
          display: inline-block;
          width: 48px;
          height: 48px;
          margin-top: 16px;
          background-repeat: no-repeat;
          background-size: 48px;
        }
        .icon-home {
          background-image: url(/static/img/icon_home.png);
        }
        .icon-task {
          background-image: url(/static/img/icon-task.png);
        }
        .icon-record {
          background-image: url(/static/img/icon_record.png);
        }
        &.active {
          .icon-home {
            background-image: url(/static/img/icon_home_checked.png);
          }
          .icon-task {
            background-image: url(/static/img/icon_task_checked.png);
          }
          .icon-record {
            background-image: url(/static/img/icon_record_checked.png);
          }
          p {
            color: #262727;
          }
        }
      }
    }
  }
</style>
