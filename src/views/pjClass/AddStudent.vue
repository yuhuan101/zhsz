<template>
  <div class="mail-list-box">
    <div class="list-top flex alignCenter">
      <div class="flex_1">
        <v-search ref="search" :placeholder="'搜索学生'" @getSearch="getSearch"></v-search>
      </div>
    </div>
    <div class="selected-all flex alignCenter" @click="selectedAllFun">
      <div class="check-circle" :class="{'checked': isSelectedAll}"></div>
      <span>全选</span>
    </div>
    <div class="list-box">
      <v-scroll class="listview"
                ref="listview"
                :listen-scroll="true"
                :probe-type="3"
                :data="data"
                @scroll="handleScroll">
        <!-- left list -->
        <ul>
          <li class="list-group"
              v-for="(group, index) in data"
              :key="index"
              ref="listGroup">
            <div class="list-group-title border-topbottom">{{group.title}}</div>
            <ul>
              <li class="list-group-item"
                  v-for="(item, i) in group.items"
                  @click="plSelectId(index,i)"
                  :key="i">
                <div class="cell-left flex alignCenter translate" >
                  <div class="check-circle" :class="{'checked': item.checked}"></div>
                </div>
                <div class="cell-item-box flex alignCenter flex_1 translate">
                  <img class="avatar" :src="item.avatar" alt="">
                  <span class="name flex_1 text-overflow">{{item.name}}</span>
                </div>
              </li>
            </ul>
          </li>
        </ul>
        <!-- right alphabet -->
        <div class="list-shortcut"
             ref="listShortcut"
             @touchstart="handleShortcutTouchStart"
             @touchmove="handleShortcutTouchMove"
             @touchend="handleShortcutTouchEnd">
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
    <div class="list-bottom-pj flex alignCenter">
      <div class="flex_1 btn gray-btn" @click="back">取消</div>
      <div class="flex_1 btn blue-btn" @click="save">确定</div>
    </div>
  </div>
</template>

<script>
  import Search from '@/components/Search.vue'
  import Scroll from '@/components/Scroll.vue'
  import data from './singer.json'
  import {mapGetters,} from 'vuex'
  const ANCHOR_HEIGHT = 18;
  export default {
    name: "AddStudent",
    data() {
      return {
        title: this.$route.query.title,
        data: data,
        scrollY: -1,
        currentIndex: 0,
        pjMultiPerson: 0, // 0,默认单人评价，1，评价多人
        checkedList: [], // 存放选中人的id
        isSelectedAll: false,
        popupVisible: false,
        allDataLen: 0,
      }
    },
    components: {
      'v-search': Search,
      'v-scroll': Scroll
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
      ...mapGetters({
        'selectedxsList': 'info/selectedxsList',
      }),
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
      this.setSelectedAll(false);
      this.touch = {}
      this.heightList = []
    },
    mounted() {
      document.title = this.title;
      console.log(this.selectedxsList)
      this.$nextTick(() => {
        this._calcGroupHeight()
      })
    },
    methods: {
      getSearch() {},
      initData() {
        this.setSelectedAll(false);
        this.isSelectedAll = false;
        this.allDataLen = 0;
      },
      plSelectId(key,tarKey) {
        this.checkedList = [];
        let target = this.data[key].items[tarKey];
        let checked = target.checked;
        this.$set(target,'checked',!checked);
        this.data.forEach((c) => {
          c.items.forEach((v) => {
            if (v.checked) {
              this.checkedList.push({id: v.id,number: 0});
            }
          })
        });
        if (this.checkedList.length == this.allDataLen) {
          this.isSelectedAll = true
        } else {
          this.isSelectedAll = false
        }
      },
      setSelectedAll(bolean) {
        this.checkedList = [];
        this.data.forEach((c) => {
          c.items.forEach((v) => {
            this.$set(v,'checked',bolean);
            if (bolean) this.checkedList.push({id: v.id,number: 0});
          })
        })
      },
      selectedAllFun() {
        this.isSelectedAll = true;
        this.setSelectedAll(true);
        this.allDataLen = this.checkedList.length;
      },
      back() {
        this.$router.go(-1);
      },
      save() {
        this.$store.commit('info/selectedStudent',this.checkedList);
        this.back();
      },
      _jump(path) {
        this.$router.push({
          path,
          query: {
            title: '评价多人',
            type: this.pjMultiPerson // 1,多人评价,0单人
          },
        });
      },
      handleShortcutTouchStart(e) {
        this.$refs.listShortcut.style.backgroundColor = 'rgba(0, 0, 0, .2)';
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
        this.$refs.listShortcut.style.backgroundColor = 'rgba(255, 255, 255, .3)'
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
  .mail-list-box {
    height: 100%;
    background-color: #FFFFFF;

    .list-top {
      height: 90px;
      padding: 0 32px;
    }

    .selected-all {
      width: 150px;
      height: 44px;
      padding-left: 32px;
      padding-top: 30px;
      span {
        margin-left: 20px;
      }
    }

    .check-circle {
      position: relative;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: #EFF1F3;
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
        border-color: #fff;
        transform: rotate(45deg) scale(1.5);
        transition: transform .2s;
      }
    }

    .list-box {
      padding: 0 20px 0 32px;
      height: calc(100% - 270px);

      .listview {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
        .list-group {
          .list-group-title {
            padding-top: 30px;
            padding-bottom: 20px;
            color: #B6B8B8;
            font-size: 28px;
          }
          .list-group-item {
            position: relative;
            cursor: pointer;
            margin-bottom: 40px;
            .cell-left {
              position: absolute;
              height: 100%;
              left: 0;
              top: 0;
              transform: translate3d(-100%, 0, 0);
              &.translate {
                transform: translate3d(0, 0, 0);
              }
            }
            .cell-item-box {
              transform: translate3d(0, 0px, 0px);

              &.translate {
                transform: translate3d(60px, 0, 0);
              }
              .avatar{
                width: 80px;
                height: 80px;
                border-radius: 50%;
              }
              .name {
                color: #262627;
                margin-left: 18px;
                font-size: 32px;
              }
            }
          }
        }
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

    .list-bottom-pj {
      height: 110px;
      padding: 0 32px;

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
