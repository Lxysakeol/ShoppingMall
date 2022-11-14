import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import { Button,MessageBox } from 'element-ui';
//注册store仓库
import store from './store/index'
//统一引入，可以在其他组件不用再引入api了
import * as API from '@/api'
import '@/validate/validate'

//注册全局组件TypeNav
import TypeNav from '@/components/TypeNav/TypeNav';
Vue.component(TypeNav.name, TypeNav);
//注册全局组件分页器
import Pagenation from '@/components/Pagenation/pagenation'
Vue.component(Pagenation.name, Pagenation);
// element组件挂载在vue原型上
Vue.component(Button.name, Button);
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.config.productionTip = false
//引入MockServe.js---mock数据
import '@/mock/mockServe.js'
//引入swipe样式
import "swiper/swiper-bundle.min.css"

new Vue({
  render: h => h(App),
  //配置全局事件总线
  beforeCreate() {
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
  },
  router,
  //组件身上会多了一个叫$store的属性
  store
}).$mount('#app')
