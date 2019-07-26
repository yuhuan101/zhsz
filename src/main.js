// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'

import '@/lib/Filters/index.js'

import 'lib-flexible'

import Mint from 'mint-ui'
Vue.use(Mint);

import { MessageBox,Toast,Indicator  } from 'mint-ui'
Vue.prototype.$messagebox = MessageBox;
Vue.prototype.$toast = Toast;
Vue.prototype.$indicator = Indicator;

import request from '@/utils/request'
Vue.prototype.$req = request;

import axios from 'axios'
Vue.prototype.$http = axios;

// import keyboard from '@/utils/softKeyboard'
// Vue.prototype.$blur = keyboard.blur;
// Vue.prototype.$focus = keyboard.focusInput;

Vue.config.productionTip = false;

import VueCookie from 'vue-cookie'
Vue.use(VueCookie);

//防重复点击或提交-----(v-preventReClick="3000")
Vue.directive('preventReClick', {
  inserted (el, binding) {
    el.addEventListener('click', () => {
      if (!el.disabled) {
        el.disabled = true;
        setTimeout(() => {
          el.disabled = false
        }, binding.value || 2000)
      }
    })
  }
});

// 全局注册指令
const handler = (e) => {
  e.preventDefault();
};
Vue.directive('roll', {
  componentUpdated(el, binding) {
    if (binding.value instanceof Array) {
      const visible = binding.value.some(e => e); // 当视图所有控制弹层的变量存在一个是true，即可阻止touchmove事件
      if (visible) {
        document.getElementsByTagName('body')[0].addEventListener('touchmove', handler, { passive: false });
      } else {
        document.getElementsByTagName('body')[0].removeEventListener('touchmove', handler, { passive: false });
      }
    } else if (typeof binding.value === 'boolean') {
      if (binding.value) {
        document.getElementsByTagName('body')[0].addEventListener('touchmove', handler, { passive: false });
      } else {
        document.getElementsByTagName('body')[0].removeEventListener('touchmove', handler, { passive: false });
      }
    }
  }
});

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
