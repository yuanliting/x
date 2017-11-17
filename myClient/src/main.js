// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

import './assets/font-awesome/css/font-awesome.css';
import './assets/jquery.js' ;
//vux中的alert组件还支持以插件的形式使用，用过Vue.use注册一个插件。
import {AlertPlugin} from "vux";
Vue.use(AlertPlugin);


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
