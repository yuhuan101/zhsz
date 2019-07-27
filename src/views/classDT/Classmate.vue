<template>
  <div class="class-mate" ref="viewBox">
    <div class="title">{{title}}</div>
    <div class="list">
      <ul
        v-infinite-scroll="getList"
        infinite-scroll-disabled="moreLoading"
        infinite-scroll-immediate-check="false"
        infinite-scroll-distance="0"
      >

        <li class="li_item flex alignCenter" @click="_jump('/studenthome')">
          <div class="li_left flex alignCenter flex_1">
            <div class="ranking">
              <img src="./img/icon_guanjun.png">
            </div>
            <div class="avatar">
              <img src="/static/img/avatar.png">
            </div>
            <div class="name">王弥明</div>
          </div>
          <div class="li_right">
            <span>26</span>
            <i class="mintui mintui-back back-icon"></i>
          </div>
        </li>
        <li class="li_item flex alignCenter">
          <div class="li_left flex alignCenter flex_1">
            <div class="ranking">
              <img src="./img/icon_yajun.png">
            </div>
            <div class="avatar">
              <img src="/static/img/avatar.png">
            </div>
            <div class="name">王弥明</div>
          </div>
          <div class="li_right">
            <span>26</span>
            <i class="mintui mintui-back back-icon"></i>
          </div>
        </li>
        <li class="li_item flex alignCenter">
          <div class="li_left flex alignCenter flex_1">
            <div class="ranking">
              <img src="./img/icon_jijun.png">
            </div>
            <div class="avatar">
              <img src="/static/img/avatar.png">
            </div>
            <div class="name">王弥明</div>
          </div>
          <div class="li_right">
            <span>26</span>
            <i class="mintui mintui-back back-icon"></i>
          </div>
        </li>
        <li class="li_item flex alignCenter">
          <div class="li_left flex alignCenter flex_1">
            <div class="ranking number">4</div>
            <div class="avatar">
              <img src="/static/img/avatar.png">
            </div>
            <div class="name">王弥明</div>
          </div>
          <div class="li_right">
            <span>26</span>
            <i class="mintui mintui-back back-icon"></i>
          </div>
        </li>
        <li class="li_item flex alignCenter">
          <div class="li_left flex alignCenter flex_1">
            <div class="ranking number">5</div>
            <div class="avatar">
              <img src="/static/img/avatar.png">
            </div>
            <div class="name">王弥明</div>
          </div>
          <div class="li_right">
            <span>26</span>
            <i class="mintui mintui-back back-icon"></i>
          </div>
        </li>
        <!--底部判断是加载图标还是提示“全部加载”-->
        <li class="wait-list-loading" v-show="queryLoading">
          <span v-show="moreLoading&&!allLoaded">加载中...</span>
          <span v-show="allLoaded">已全部加载</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Classmate",
    data() {
      return {
        title: this.$route.query.title,
        queryLoading: true,
        moreLoading: false, // 若为真，则无限滚动不会被触发
        allLoaded: false,
        page_number: 1,
        page_count: 10,
        list: ['1', '2', '3', '4', '5', '7', '8', '9', '10'],
      }
    },
    mounted() {
      this.loadMore()
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
      loadMore() {
        this.$refs.viewBox.addEventListener('scroll', () => {
          var scrollTop = this.$refs.viewBox.scrollTop;
          this.scrollTop = scrollTop;
          var windowHeight =
            document.documentElement.clientHeight || document.body.clientHeight; //变量scrollHeight是滚动条的总高度
          var scrollHeight = this.$refs.viewBox.scrollHeight; //滚动条到底部的条件
          let h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight; //浏览器高度
          if (scrollTop + windowHeight == scrollHeight) {
            console.log('开始加载')
            this.getList()
          }
        })
      },
      jump(path) {
        this.$router.push({
          path
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .class-mate {
    padding: 0 32px;
    height: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    background: linear-gradient(360deg,rgba(255,245,219,1) 0%,rgba(255,235,200,1) 100%);

    .title {
      height: 115px;
      line-height: 115px;
      text-align: center;
      color: #974100;
      font-size: 36px;
      font-weight: 600;
    }
    .list {
      padding-left: 26px;
      padding-right: 32px;
      border-radius: 20px;
      height: calc(100% - 115px);
      background-color: #ffffff;

      .li_item {
        height: 120px;
        .ranking {
          width: 46px;
          height: 64px;
        }
        .number {
          color: #262727;
          font-size: 36px;
          text-align: center;
        }
        .avatar {
          width: 80px;
          height: 80px;
          margin-left: 40px;
        }
        .name {
          color: #262727;
          font-size: 28px;
          margin-left: 20px;
        }
        .li_right {
          span {
            color: #33A5FF;
            font-size: 36px;
            margin-right: 10px;
          }
          .back-icon {
            display: inline-block;
            vertical-align: top;
            margin-top: 10px;
            color: #C7C7CC;
            transform: rotate(-180deg);
          }
        }
      }
      img {
        width: 100%;
        height: 100%;
      }
      .wait-list-loading {
        height: 80px;
        line-height: 80px;
        text-align: center;
      }
    }
  }
</style>
