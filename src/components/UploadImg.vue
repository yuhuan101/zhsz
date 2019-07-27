<template>
  <div class="upload-box">
    <input @change="fileChange($event)" type="file" id="upload_file" multiple  style="display: none"/>
  </div>
</template>

<script>
  import {FileApi as API} from '@/utils/api'
  const PATH_HEAD = process.env.NODE_ENV == 'development' ? '/api' : '/szxy';
  export default {
    name: "UploadImg",
    props: ['maxNumber','imgs'],
    data() {
      return {
        size: 0,
        imglists: [],
      }
    },
    watch: {
      imgs(nVal) {
        this.imglists = nVal;
      }
    },
    methods: {
      fileClick() {
        document.getElementById('upload_file').click()
      },
      fileChange(el) {
        if (!el.target.files[0].size) return;
        let fileLen = el.target.files.length;
        let imgLen = this.imgs.length;
        let totalLen = parseInt(imgLen-0) + parseInt(fileLen-0);
        if (totalLen > this.maxNumber) {
          this.$toast(`最大支持${this.maxNumber}张图片上传`);
          return;
        }
        this.fileList(el.target.files);
        el.target.value = ''
      },
      fileList(files) {
        for (let i = 0; i < files.length; i++) {
          this.fileAdd(files[i],parseInt(i-0)+parseInt(this.imglists.length));
        }
      },
      fileAdd(file,key) {
        let self = this;
        this.size = this.size + file.size;//总大小
        let reg = /\.(jpg|png|jpeg)$/ig;
        let fileName = file.name;
        if (!reg.test(fileName)) {
          this.$toast('请选择jpg,png,jpeg文件上传');
          return;
        }
        self.upload(file,key)
      },
      upload(url,key) {
        let formData = new FormData();
        formData.append('files',url);
        let vm = this;
        let config = {
          // headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          headers: {'Content-Type': 'multipart/form-data'},
          onUploadProgress: function (e) {
            //属性lengthComputable主要表明总共需要完成的工作量和已经完成的工作是否可以被测量
            //如果lengthComputable为false，就获取不到e.total和e.loaded
            if (e.lengthComputable) {
              var rate = e.loaded / e.total;  //已上传的比例
              var progress = (rate *100).toFixed(2)+ '%';
              if (typeof (vm.imglists[key]) == 'undefined') {
                vm.imglists.push({
                  progress,
                  url: '',
                  fjpath: '',
                });
              } else {
                vm.imglists[key].progress = progress;
                vm.imglists[key].url = '';
                vm.imglists[key].fjpath = '';
              }
              vm.$emit('getUplaodFile', vm.imglists);
            }
          }
        };
        this.$http.post(API.uploadFile, formData, config)
          .then(data => {
              if (data.resultCode == 1) {
                this.imglists[key].progress = '100.00%';
                this.imglists[key].url = data.value[0].absolutePath;
                this.imglists[key].fjpath = data.value[0].relativePath;
                this.$emit('getUplaodFile', this.imglists);
              } else {
                this.$toast(data.resultMessage);
                this.imglists.splice(key,1);
                this.$emit('getUplaodFile', this.imglists);
              }
            })
              .catch(err => {
                this.$toast(`图片上传失败,请重试!`);
                // console.log(JSON.stringify(err))
                this.imglists.splice(key,1);
                this.$emit('getUplaodFile', this.imglists);
              });
      }
    }
  }
</script>

<style lang="less" scoped>

</style>
