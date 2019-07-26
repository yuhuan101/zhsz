<template>
  <div class="search-box flex alignCenter">
    <i class="mintui mintui-search search-icon"></i>
    <input type="text" :placeholder="placeholder" v-model="keyWord" @input="_input" />
  </div>
</template>

<script>
export default {
  name: 'Search',
  props: ['placeholder'],
  data () {
    return {
      keyWord: '',
      timer: null
    }
  },
  methods: {
    _input() {
      !!this.timer && clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.$emit('getSearch',this.keyWord)
      },500)
    }
  }
}
</script>

<style lang="less" scoped>
  .search-box {
    width: 100%;
    height: 60px;
    background-color: #EFF1F3;
    border-radius: 30px;

    .search-icon {
      color: #B6B8B8;
      font-size: 30px;
      margin-left: 20px;
      margin-right: 20px;
    }
    input[type="text"] {
      border: none;
      outline: none;
      font-size: 30px;
      color: #262727;
      background-color: transparent;
      -webkit-tap-highlight-color: rgba(0,0,0,0);
    }
    input::-webkit-input-placeholder { /* WebKit browsers */
      color: #B6B8B8;
    }

   input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
      color: #B6B8B8;
    }

    input::-moz-placeholder { /* Mozilla Firefox 19+ */
      color: #B6B8B8;
    }

   input:-ms-input-placeholder { /* Internet Explorer 10+ */
      color: #B6B8B8;
    }
  }
</style>
