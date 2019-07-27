<template>
  <div class="section record-list">
    <div class="list-top flex alignCenter">
      <div class="title flex_1">评价详情</div>
      <div class="tab-box1 clear" v-if="pjType == 'teacher'">
        <div class="tab-item1 fl" @click="_tab1(1)">学生</div>
        <div class="tab-item1 fl" @click="_tab1(2)">班级</div>
        <span :class="{'span_left0': type == 1, 'span_left100': type == 2}">{{type == 1 ? '学生' : '班级'}}</span>
      </div>
    </div>
    <div class="list-content">
      <div class="tab-box2 flex alignCenter">
        <div class="tab-item2" :class="{'marginLeft42': index != 0}" v-for="(item,index) in pjTabList" :key="index" @click="_tab2(index)">
          <span :class="{'active': tab2_key == index}">{{item.name}}</span>
        </div>
      </div>
      <v-student ref="student" v-if="pjType == 'student'"></v-student>
      <v-class ref="class" v-if="pjType == 'class'"></v-class>
    </div>
  </div>
</template>

<script>
  import Student from './Student'
  import Class from './Class'
  export default {
    name: "RecordList",
    props: ['pjType','pjTabList'],
    components: {
      'v-student': Student,
      'v-class': Class
    },
    data() {
      return {
        type: 1, // 1,学生，2，班级
        tab2: [
          {type: 1,name: '全部'},
          {type: 2,name: '加分'},
          {type: 3,name: '减分'},
          {type: 4,name: '奖励勋章'},
          {type: 5,name: '扣除勋章'}
        ],
        tab2_key: 0,
      }
    },

    methods: {
      _tab1(type) {
        this.type = type;
      },
      _tab2(key) {
        this.tab2_key = key
      }
    }
  }
</script>

<style lang="less"  scoped>
  .section {
    background-color: #FFFFFF;
    border-radius: 20px;
  }
  .record-list {
    margin-top: 40px;
    padding: 0 32px;
    box-shadow: 0 6px 18px rgba(86,104,119,0.15);
    .list-top {
      height: 84px;
      border-bottom: 1px solid #EFF1F3;

      .title {
        color: #262727;
        font-size: 36px;
        font-weight: 600;
      }
      .tab-box1 {
        position: relative;
        width: 200px;
        height: 48px;
        border-radius: 24px;
        cursor: pointer;
        background-color: #EFF1F3;
        border-bottom: 1px solid #EFF1F3;
        .tab-item1 {
          width: 50%;
          line-height: 48px;
          text-align: center;
          color: #262727;
          font-size: 28px;
        }
        .active {
          color: #ffffff;
        }
        span {
          position: absolute;
          top: 0;
          width: 100px;
          height: 48px;
          line-height: 48px;
          color: #ffffff;
          font-size: 28px;
          text-align: center;
          border-radius: 24px;
          background-color: #33A5FF;
          transition: all .2s;
        }
        .span_left0 {
          left: 0;
        }
        .span_left100 {
          left: 100px
        }
      }
    }
    .list-content {
      .tab-box2 {
        height: 60px;
        margin-top: 20px;
        color: #B6B8B8;
        font-size: 30px;
        padding-left: 16px;

        .marginLeft42 {
          margin-left: 42px;
        }
        .tab-item2 {
          text-align: center;
          cursor: pointer;
          span.active {
            position: relative;
            color: #262727;
            font-size: 30px;
            font-weight: 600;
          }
          span.active:after {
            content: '';
            width: 80%;
            height: 4px;
            background-color: #33A5FF;
            position: absolute;
            left: 50%;
            bottom: -8px;
            margin-left: -40%;
          }
        }
      }
    }
  }
</style>
