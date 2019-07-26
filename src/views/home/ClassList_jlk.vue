<template>
  <ul
    v-infinite-scroll="getList"
    infinite-scroll-disabled="moreLoading"
    infinite-scroll-immediate-check="false"
    infinite-scroll-distance="0"
  >
    <li class="li_item" v-for="item in list">
      <div class="li_top flex" @click="jump('/studentlist',item)">
        <div class="class-img"><img src="./img/class_bg.png"></div>
        <div class="class_name flex_1">
          <p class="name">{{item}}班</p>
          <p class="rs">共30人</p>
        </div>
        <div class="class_pj">本月评价 &nbsp;10/20</div>
      </div>
      <div class="li_tip">本月共提醒<span class="yellow-text">12</span>人，共<span class="yellow-text">20</span>次</div>
      <div class="li_jlk clear">
        <div class="fl">
          <img src="./img/icon_bo.png">
          <span class="jlk_number">+5</span>
        </div>
        <div class="fl">
          <img src="./img/icon_ya.png">
          <span class="jlk_number">+5</span>
        </div>
        <div class="fl">
          <img src="./img/icon_jian.png">
          <span class="jlk_number">+5</span>
        </div>
        <div class="fl">
          <img src="./img/icon_xiong.png">
          <span class="jlk_number">+5</span>
        </div>
      </div>
    </li>
    <!--底部判断是加载图标还是提示“全部加载”-->
    <li class="wait-list-loading" v-show="queryLoading">
      <span v-show="moreLoading&&!allLoaded">加载中...</span>
      <span v-show="allLoaded">已全部加载</span>
    </li>
  </ul>
</template>

<script>
  export default {
    name: "ClassList_jlk",
    props: [],
    data() {
      return {
        queryLoading: true,
        moreLoading: false, // 若为真，则无限滚动不会被触发
        allLoaded: false,
        page_number: 1,
        page_count: 10,
        list: ['1', '2', '3', '4', '5', '7', '8', '9', '10'],
      }
    },
    methods: {
      getList() {
        console.log(1)
        if (this.allLoaded) {
          this.moreLoading = true
          return
        }
        if (!this.queryLoading) { // =false即条数少
          return
        }
        this.moreLoading = true
        setTimeout(() => {
          let last = this.list[this.list.length - 1];
          for (let i = 1; i <= 10; i++) {
            this.list.push((last - 0) + (i - 0));
            // if (result.todo_list.length > 0) {
            //   this.moreLoading = false
            // } else {
            //   this.allLoaded = true
            //   this.moreLoading = true
            // }
          }
          this.moreLoading = false;
        }, 2500);
      },
      jump(path,title) {
        this.$router.push({
          path,
          query: {
            title
          },
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  ul {
    margin: 0 32px;
    border-radius: 20px;
    background-color: #ffffff;
    li.li_item {
      width: 100%;
      margin-bottom: 40px;
      border-radius: 20px;
      box-shadow: 0 6px 18px rgba(86, 104, 119, 0.1);

      .li_top {
        padding-top: 32px;
        margin: 0 20px;
        padding-bottom: 40px;

        .class-img {
          width: 100px;
          height: 100px;
          margin-right: 20px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .name {
          font-size: 36px;
          color: #262727;
          font-weight: 600;
        }
        .rs {
          color: #B6B8B8;
          font-size: 28px;
          margin-top: 15px;
        }
        .class_pj {
          width: 238px;
          height: 60px;
          line-height: 60px;
          margin-top: 8px;
          color: #ffffff;
          font-size: 28px;
          text-align: center;
          margin-right: -20px;
          background: linear-gradient(90deg, rgba(255, 211, 91, 1) 0%, rgba(255, 149, 62, 1) 100%);
          border-radius: 30px 0 0 30px;
        }
      }
      .li_tip {
        color: #262727;
        font-size: 28px;
        margin-left: 20px;
        .yellow-text {
          color: #FFB600;
          margin: 0 10px;
        }
      }
      .li_jlk {
        margin: 32px 0 0 20px;
        padding-bottom: 40px;
        .fl {
          margin-right: 40px;
          margin-bottom: 10px;
        }
        img {
          display: inline-block;
          vertical-align: middle;
          width: 68px;
          height: 48px;
          margin-right: 10px;
        }
        .jlk_number {
          color: #262727;
          font-size: 28px;
          font-weight: 600;
        }
      }
    }
    .wait-list-loading {
      height: 80px;
      line-height: 80px;
      text-align: center;
    }
  }
</style>
