import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//引入vaunt
import './vant'
//移动端适配
import  'lib-flexible'
Vue.config.productionTip = false

//注册footer组件
import Footer from "@/components/Footer"
Vue.component(Footer.name,Footer)
//自定义指令
Vue.directive('focus',{
  inserted(el){
    el.focus()
   // console.log(el instanceof HTMLElement);
    //el.querySelector('input').focus()
  },
  update(el){
    el.focus()
  }
})
new Vue({
  beforeCreate() {
    Vue.prototype.$BUS = this
  },
  router,
  store,
  render: h => h(App),
}).$mount('#app')
