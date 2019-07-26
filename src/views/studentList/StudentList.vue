<template>
  <div class="student-list">
    <div class="list-top flex alignCenter">
      <div class="flex_1">
        <v-search ref="search" :placeholder="'搜索学生'" @getSearch="getSearch"></v-search>
      </div>
    </div>
    <div class="selected-all flex alignCenter" v-show="pjMultiPerson == 1" @click="selectedAllFun">
      <div class="check-circle" :class="{'checked': isSelectedAll}"></div>
      <span>全选</span>
    </div>
    <div class="list-box" :class="{'list-box-height': pjMultiPerson == 1}">
      <v-scroll
        class="listview"
        ref="listview"
        :listen-scroll="true"
        :probe-type="3"
        :data="data"
        @scroll="handleScroll"
      >
        <!-- left list -->
        <ul>
          <li class="list-group" v-for="(group, index) in data" :key="index" ref="listGroup">
            <div class="list-group-title" :class="{'paddingTop10': index != 0 }">{{group.title}}</div>
            <ul class="clear">
              <li
                class="list-group-item fl"
                :class="{'marginRight0': (i+1)%3 == 0 ,'checked': item.checked}"
                v-for="(item, i) in group.items"
                :key="i"
                @click="handerLi(index,i)"
              >
                <img class="avatar" :src="item.avatar">
                <div class="name text-overflow">{{item.name}}</div>
                <div class="check-circle" :class="{'checked': item.checked}" v-show="pjMultiPerson == 1"></div>
              </li>
            </ul>
          </li>
        </ul>
        <!-- right alphabet -->
        <div
          class="list-shortcut"
          ref="listShortcut"
          @touchstart="handleShortcutTouchStart"
          @touchmove="handleShortcutTouchMove"
          @touchend="handleShortcutTouchEnd"
        >
          <ul>
            <li class="item"
                v-for="(item, index) in shortcutList"
                :key="index"
                :data-index="index"
                :class="{'current': currentIndex === index}">
              {{item}}
            </li>
          </ul>
        </div>
      </v-scroll>
    </div>
    <div class="list-bottom flex alignCenter" v-show="pjMultiPerson != 1">
      <div class="flex flex_1 alignCenter justifyCenter" @click="pjMultiPersonFun(1)">
        <img src="./img/icon_pj.png">
        <span>评价多人</span>
      </div>
    </div>
    <div class="list-bottom-pj flex alignCenter" v-show="pjMultiPerson == 1">
      <div class="flex_1 btn gray-btn" @click="pjMultiPersonFun(0)">取消</div>
      <div class="flex_1 btn blue-btn" @click="pj">评价 ({{checkedList.length}})</div>
    </div>
  </div>
</template>

<script>
  import Search from '@/components/Search.vue'
  import Scroll from '@/components/Scroll.vue'
  import data from './singer.json'
  const ANCHOR_HEIGHT = 18;
  export default {
    name: "studentList",
    components: {
      'v-search': Search,
      'v-scroll': Scroll,
    },
    data() {
      return {
        title: this.$route.query.title,
        data: data,
        copyArr: [],
        scrollY: -1,
        currentIndex: 0,
        pjMultiPerson: 0, // 0,默认单人评价，1，评价多人
        checkedList: [], // 存放选中人的id
        isSelectedAll: false,
        allDataLen: 0,
        studentName: '',
        jlk: false, // 激励卡根据学校编号
      }
    },
    watch: {
      data() {
        this.$nextTick(() => {
          this._calcGroupHeight()
        })
      },
      scrollY(newY) {
        const heightList = this.heightList
        // 当滚动到最顶部，newY > 0（对应操作：在最顶部向下拉）
        if (newY > 0) {
          newY = 0
          this.currentIndex = 0
          return
        }
        // 在中间部分滚动，正常情况
        for (let i = 0; i < heightList.length - 1; i++) {
          let heightTop = heightList[i]
          let heightBottom = heightList[i + 1]
          if (-newY >= heightTop && -newY < heightBottom) {
            this.currentIndex = i
            return
          }
        }
        // 当滚动到底部，且-newY 大于最后一个元素的上限
        this.currentIndex = heightList.length - 2
      },
    },
    computed: {
      shortcutList() {
        return this.data.map(group => {
          return group.title.slice(0, 1)
        })
      },
      fixedTitle() {
        if (this.scrollY > 0) {
          return ''
        }
        return this.data[this.currentIndex] ? this.data[this.currentIndex].title : ''
      }
    },
    created() {
      this.touch = {};
      this.heightList = [];
      this.copyArr = JSON.parse(JSON.stringify(this.data));
      this.setSelectedAll(false)
    },
    mounted() {
      document.title = this.title;
      console.log(this.data)
      this.$nextTick(() => {
        this._calcGroupHeight()
      })
    },
    methods: {
      getSearch(value) {
        let a = value.replace(/(^\s*)|(\s*$)/g, "");
        if (a == '') {
          let arr = JSON.parse(JSON.stringify(this.copyArr));
          this.data = arr;
          return;
        }
        let arr = [],newArr = [];
        this.data.forEach((value,index) => {
          arr[index] = value;
          arr[index].items = value.items.filter(
            item => item.name.indexOf(a) >= 0)
        });
        arr.forEach((c) => {
          if (c.items.length > 0) {
            newArr.push(c)
          }
        });
        this.data = newArr;
      },
      selectedAllFun() {
        this.isSelectedAll = true;
        this.setSelectedAll(true);
        this.allDataLen = this.checkedList.length;
      },
      handerLi(key,tarKey) {
        if (this.pjMultiPerson == 1) {
          this.checkbox(key,tarKey)
        } else {
          this.studentName = this.data[key].items[tarKey].name;
          this._jump()
        }
      },
      checkbox(key,tarKey) {
        this.checkedList = [];
        let target = this.data[key].items[tarKey];
        let checked = target.checked;
        this.$set(target,'checked',!checked);
        this.data.forEach((c) => {
          c.items.forEach((v) => {
            if (v.checked) {
              this.checkedList.push(
                {
                  id: v.id,
                  name: v.name
                }
              );
            }
          })
        });
        if (this.checkedList.length == this.allDataLen) {
          this.isSelectedAll = true
        } else {
          this.isSelectedAll = false
        }
      },
      pjMultiPersonFun(type) {
        this.pjMultiPerson = type;
        if (!type) this.initData();
      },
      initData() {
        this.setSelectedAll(false);
        this.isSelectedAll = false;
        this.allDataLen = 0;
        this.studentName = ''
      },
      setSelectedAll(bolean) {
        this.checkedList = [];
        this.data.forEach((c) => {
          c.items.forEach((v) => {
            this.$set(v,'checked',bolean);
            if (bolean) this.checkedList.push({
              id: v.id,
              name: v.name
            });
          })
        })
      },
      pj() {
        if (this.checkedList.length == 0) {
          this.$toast('请选择要评价的学生');
          return;
        }
        this._jump();
      },
      _jump() {
        this.$router.push({
          path: this.jlk ? '/pjstudentjlk' : '/pjstudent',
          query: {
            title: this.studentName,
            type: this.pjMultiPerson // 1,多人评价,0单人
          },
        });
        this.$cookie.set('studentInfo', JSON.stringify(this.checkedList));
      },
      handleShortcutTouchStart(e) {
        // this.$refs.listShortcut.style.backgroundColor = 'rgba(0, 0, 0, .2)';
        const anchorIndex = +e.target.dataset['index'] // 获取到的是字符串
        this.touch.y1 = e.touches[0].pageY
        this.touch.anchorIndex = anchorIndex
        this._scrollTo(anchorIndex)
      },
      handleShortcutTouchMove(e) {
        this.touch.y2 = e.touches[0].pageY
        let deltaIndex = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT
        deltaIndex = Math.floor(deltaIndex)
        const anchorIndex = this.touch.anchorIndex + deltaIndex
        this._scrollTo(anchorIndex)
      },
      handleShortcutTouchEnd(e) {
        // this.$refs.listShortcut.style.backgroundColor = 'rgba(255, 255, 255, .3)'
      },
      handleScroll(pos) {
        this.scrollY = pos.y
      },
      _calcGroupHeight() {
        this.heightList = []
        const listEl = this.$refs.listGroup
        let height = 0
        this.heightList.push(height)
        for (let i = 0; i < listEl.length; i++) {
          let item = listEl[i]
          height += item.clientHeight
          this.heightList.push(height)
        }
      },
      _scrollTo(index) {
        // 点击上下多余部分
        if (Object.is(index, null) || Object.is(index, NaN)) {
          return
        }
        // 边界情况
        if (index < 0) {
          index = 0
        }
        if (index > this.heightList.length - 2) {
          index = this.heightList.length - 2
        }
        this.scrollY = -this.heightList[index]
        this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0)
      }
    }
  }
</script>

<style lang="less" scoped>
  .student-list {
    height: 100%;

    .list-top {
      height: 88px;
      padding: 0 32px;
      background-color: #ffffff;
    }
    .selected-all {
      width: 150px;
      height: 44px;
      padding-left: 32px;
      padding-top: 30px;
      span {
        color: #262727;
        margin-left: 20px;
      }
    }
    .check-circle {
      position: relative;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: #FFFFFF;
      &.checked {
        border-color: #33A5FF;
        background-color: #33A5FF;
      }
      &:after {
        content: '';
        width: 5px;
        height: 11px;
        position: absolute;
        left: 18px;
        top: 10px;
        border: 2px solid transparent;
        border-top: 0;
        border-left: 0;
        border-color: #EFF1F3;
        transform: rotate(45deg) scale(1.5);
        transition: transform .2s;
      }
    }
    .list-box {
      padding: 0 12px 0 34px;
      height: calc(100% - 186px);
      &.list-box-height {
        height: calc(100% - 260px);
      }
      .listview {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;

        .list-group {
          .list-group-title {
            padding-top: 40px;
            padding-bottom: 20px;
            color: #B6B8B8;
            font-size: 28px;
            &.paddingTop10 {
              padding-top: 10px;
            }
          }
          .list-group-item {
            position: relative;
            width: 200px;
            height: 200px;
            text-align: center;
            margin-right: 28px;
            margin-bottom: 30px;
            border-radius: 20px;
            background-color: #ffffff;
            box-sizing: border-box;
            &.marginRight0 {
              margin-right: 0;
            }
            &.checked {
              border: 2px solid #33A5FF;
            }
            .check-circle {
              position: absolute;
              right: 8px;
              top: 8px;
              background-color: #EFF1F3;
              &:after {
                border-color: #ffffff;
              }
              &.checked {
                border-color: #33A5FF;
                background-color: #33A5FF;
              }
            }
            .avatar {
              width: 100px;
              height: 100px;
              border-radius: 50%;
              margin: 20px 0 20px 0;
            }
            .name {
              padding: 0 32px;
              color: #262627;
              font-size: 28px;
            }
          }
        }

        /*right alphabet*/
        .list-shortcut {
          z-index: 1;
          position: absolute;
          top: 50%;
          right: 0;
          transform: translateY(-50%);
          width: 40px;
          padding: 40px 0;
          border-radius: 10px;
          text-align: center;
          & .item {
            padding: 3px;
            line-height: 1;
            color: #B6B8B8;
            font-size: 28px;
            &.current {
              color: #33A5FF;
            }
          }
        }
      }
    }
    .list-bottom {
      height: 98px;
      cursor: pointer;
      background-color: #ffffff;
      img {
        width: 36px;
        height: 36px;
        margin-right: 16px;
      }
      span {
        font-size: 32px;
        color: #262627;
      }
    }
    .list-bottom-pj {
      height: 110px;
      padding: 0 32px;
      background-color: #ffffff;
      .btn {
        height: 88px;
        line-height: 88px;
        text-align: center;
        font-size: 30px;
        cursor: pointer;
        margin-bottom: 10px;
        border-radius: 50px;
      }
      .gray-btn {
        margin-right: 46px;
      }
    }
  }
</style>
