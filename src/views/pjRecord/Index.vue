<template>
  <div class="record-box" ref="viewBox">
    <v-pj-record ref="pjRecord"></v-pj-record>
  </div>
</template>

<script>
  import PjRecord from './PjRecord.vue'
  export default {
    name: "Index",
    components: {
      'v-pj-record': PjRecord,
    },
    data() {
      return {
        popupVisible: false,
        nowTime: new Date().getTime(),
        searchTime: '按学期',
        timeList: [
          {type: 1,name: '按学期'},
          {type: 2,name: '按周'},
          {type: 3,name: '按月'},
        ],
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
    computed: {
      dataList () {
        let dateSlots = [
          {
            flex: 1,
            values: this.timeList,
            className: 'slot1',
            textAlign: 'center'
          }
        ];
        return  dateSlots
      },
    },
    methods: {
      _tab1(type) {
        this.type = type;
      },
      _tab2(key) {
        this.tab2_key = key
      },
      onConfirm() {

      }
    }
  }
</script>

<style lang="less" scoped>
  .record-box {
    height: 100%;
    padding: 0 32px;
    background-color: #FFFFFF;
    overflow-x: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
  }
</style>
