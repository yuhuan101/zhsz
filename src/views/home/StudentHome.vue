<template>
  <div class="student-home" ref="viewBox">
    <!--首页头部-->
    <v-student-header ref="header" :scrollTop="scrollTop"></v-student-header>
    <div class="content">
      <ul>
        <li>

        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import StudentHeader from './StudentHeader.vue'
  export default {
    name: "StudentHome",
    components: {
      'v-student-header': StudentHeader,
    },
    data() {
      return {
        scrollTop: 0, // 控制头部显隐
        queryLoading: true,
        moreLoading: false, // 若为真，则无限滚动不会被触发
        allLoaded: false,
        page_number: 1,
        page_count: 10,
        list: ['1','2','3','4','5','7','8','9','10'],
      }
    },
    activated() {
      console.log(1)
    },
    mounted() {
      console.log(2)
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
            this.list.push((last-0)+(i-0));
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

<style lang="less"  scoped>
  .student-home {
    position: relative;
    height: 100%;
    background-color: #ffffff;
    overflow-x: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;

    .content {
      position: absolute;
      width: 100%;
      z-index: 1000;
      top: 214px;
      left: 0;
      bottom: 0;
    }
  }
</style>
