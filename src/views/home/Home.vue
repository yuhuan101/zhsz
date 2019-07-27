<template>
  <div class="home">
    <component :is="cmpName"></component>
  </div>
</template>

<script>
  import TeacherHome from './TeacherHome.vue'
  import StudentHome from './StudentHome.vue'
  export default {
    name: "Home",
    data() {
      return {
        cmpName: 'TeacherHome'
      }
    },
    created() {
      console.log("进入")
    },
    components: {
      TeacherHome,
      StudentHome
    },
    methods: {
      urlSearch() {
        var name,value;
        var str=location.href; //取得整个地址栏
        var num=str.indexOf("?");
        str=str.substr(num+1); //取得所有参数   stringvar.substr(start [, length ]

        var arr=str.split("&"); //各个参数放到数组里
        for(var i=0;i < arr.length;i++){
          num=arr[i].indexOf("=");
          if(num>0){
            name=arr[i].substring(0,num);
            value=arr[i].substr(num+1);
            this[name]=value;
          }
        }
      },
      getLoginInfo() {
        var Request = new this.urlSearch();
        let name = decodeURIComponent(Request.name);
        this.$cookie.set('xxdm', Request.xxdm);
        this.$cookie.set('zgh', Request.zgh);
        this.$cookie.set('name', name);
      },
    }
  }
</script>

<style lang="less" scoped>
  .home {
    height: 100%;
  }
</style>
