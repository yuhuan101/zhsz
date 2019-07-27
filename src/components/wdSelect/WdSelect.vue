<template>
  <mt-popup v-model="popupVisible" position="bottom" class="mint-popup">
    <div class="wd-box">
      <div class="wd-header flex alignCenter">
        <div class="btn cancel" @click="popupVisible=false">取消</div>
        <div class="title flex_1">全部</div>
        <div class="btn sure" @click="_sure">确定</div>
      </div>
      <div class="wd-content">
        <div class="wd-tab">
          <ul class="tab">
            <li v-if="tabList.length == 0">请选择</li>
            <li class="tab-item" :class="{'active': tabKey == index}" v-else v-for="(item,index) in tabList" :key="index" @click="_tab(index)">
              {{item.name}}
            </li>
          </ul>
        </div>
        <div class="tab-content">
          <ul>
            <li class="flex alignCenter" v-for="(item,index) in wdList" :key="index">
              <span class="radio" :class="{'checked': checkKey == index}" @click="_check(index)"></span>
              <div class="name flex_1" @click="findChild(item.name,index)">{{item.name}}</div>
              <i class="mintui mintui-back back-icon" @click="findChild(item.name,index)"></i>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </mt-popup>
</template>

<script>
  import {PjApi as API} from '@/utils/api'
  export default {
    name: "WdSelect",
    data() {
      return {
        name: '',
        popupVisible: false,
        tabKey: 0,
        checkKey: -1,
        tabList: [],
        wdList: [],
        copyList: [],
      }
    },
    mounted() {
      this.getWDAll();
    },
    methods: {
      async getWDAll() {
        let data = {
          name: this.name
        };
        const res = await this.$req.get(API.getAll, data);
        if (res.resultCode == 1) {
          this.wdList = res.value;
          this.copyList = JSON.parse(JSON.stringify(res.value))
        }
      },
      async findChild(name,key) {
        this.name = name;
        let data = {
          name: this.name
        };
        this.checkKey = key;
        this._pushTabList(key);
        const res = await this.$req.get(API.getAll, data);
        if (res.resultCode == 1) {
          if (!res.value[0].dimensionItemVOList) {
            this.$toast('该维度下没有数据');
            return;
          }
          this.wdList = res.value[0].dimensionItemVOList ? res.value[0].dimensionItemVOList : [];
          this._pushTabList(0);
        }
      },
      show() {
        this.popupVisible = true;
      },
      hide() {
        this.popupVisible = false;
      },
      _check(key) {
        if (this.checkKey == key) return;
        this.checkKey = key;
        this._pushTabList(key);
      },
      _pushTabList(key) {
        let target = this.wdList[key];
        this.tabKey = this.wdList[0].level - 1;
        if (!!this.tabList[target.level - 1]) {
          this.tabList[target.level - 1].name = target.name;
          this.tabList[target.level - 1].checkKey = key
        } else {
          this.tabList.push({
            checkKey: key,
            name: target.name,
            key: target.level - 1,
            arr: this.wdList
          })
        }
      },
      _tab(key) {
        let target = this.tabList[key];
        this.wdList = target.arr;
        this.tabKey = key;
        this.checkKey = target.checkKey;
        if (this.tabList[key+1]) {
          this.tabList.splice(key+1,this.tabList.length)
        }
      },
      _sure() {
        if (this.checkKey == -1) {
          this.$toast('请选择维度');
          return;
        }
        this.popupVisible = false;
        this.$emit('getWdName',this.tabList)
        this.$emit('getWdInfo',this.wdList[this.checkKey])
      }
    }
  }
</script>

<style lang="less" scoped>
  .mint-popup-bottom {
    border-radius: 40px 40px 0 0;
  }

  .wd-box {
    max-height: 674px;
    border-radius: 40px 40px 0 0;
    background-color: #ffffff;
    .wd-header {
      position: relative;
      height: 98px;
      line-height: 98px;
      color: #262627;
      font-size: 36px;
      .btn {
        width: 210px;
        font-size: 36px;
        text-align: center;
      }
      .cancel {
        color: #B6B8B8;
      }
      .sure {
        color: #33A5FF;
      }
      .title {
        color: #262627;
        font-size: 36px;
        font-weight: 600;
        text-align: center;
      }
    }
    .wd-content {
      padding-left: 60px;
      padding-right: 66px;
      overflow-x: hidden;
      .wd-tab {
        height: 60px;
        overflow-y: hidden;
        border-bottom: 2px solid #EFF1F3;
        .tab {
          height: 80px;
          line-height: 55px;
          color: #B6B8B8;
          font-size: 28px;
          display: -webkit-box;
          white-space: nowrap;
          overflow-x: scroll;
          overflow-y: hidden;
          -webkit-overflow-scrolling: touch;
          .tab-item {
            display: inline-block;
            margin-right: 70px;
            &.active {
              color: #262727;
              border-bottom: 4px solid #33A5FF;
            }
          }
        }
      }
      .tab-content {
        max-height: 520px;
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
        li {
          height: 95px;
        }
        .name {
          color: #262727;
          font-size: 40px;
        }
        .radio {
          display: inline-block;
          vertical-align: middle;
          position: relative;
          width: 40px;
          height: 40px;
          margin-right: 20px;
          border-radius: 100%;
          background-color: #EFF1F3;
          &.checked {
            background-color: #33A5FF;
          }
          &:after {
            content: " ";
            border-radius: 100%;
            position: absolute;
            width: 12px;
            height: 12px;
            top: 50%;
            left: 50%;
            margin-left: -6px;
            margin-top: -6px;
            background-color: #ffffff;
          }
        }
        .back-icon {
          width: 30px;
          color: #B6B8B8;
          transform: rotate(-180deg);
        }
      }
    }
  }
</style>
