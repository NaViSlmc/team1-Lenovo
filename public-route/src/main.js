// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import request from './ajax.js' //引入ajax对象
import ElementUI from "element-ui"  //引入element ui
import 'element-ui/lib/theme-chalk/index.css'  //引入element-ui的css样式
import router from "./router/index.js"  //引入路由对象

Vue.config.productionTip = false
Vue.prototype.$http = request    //将request对象赋值给vue原型对象的一个属性
Vue.use(ElementUI)  //在vue项目中使用element ui


/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  router: router,
  template: '<App/>'
})
