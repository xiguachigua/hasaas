// 导入Vue包
import Vue from 'vue'
// 重置全局样式   相当于base.css
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
// 导入elementui第三方组件库并设置语言包
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n
// 设置全局样式
import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'
// 导入svg精灵图
import '@/icons' // icon
// 导入权限认证
import '@/permission' // permission control

// 注册全局组件
import component from '@/components'
Vue.use(component)
// 全局时间
import * as filter from '@/filters'
Object.keys(filter).forEach(k => {
  Vue.filter(k, filter[k])
})
/* import * as directives from '@/directives'
// 批量注册全局的自定义指令
Object.keys(directives).forEach(key => {
  Vue.directive(key, directives[key])
})
 */
import { imgerror, color } from '@/directives'
Vue.directive('imgerror', imgerror)
Vue.directive('color', color)
// 定义全局自定义指令
/* Vue.directive('imgerror', {
  // el指令所在的元素
  // binding  指令的相关信息对象 binding.value指令的值
  inserted(el, bindings) {// bindings 里面是指令的参数信息对象   // el 指令所在dom元素   // 会在当前指令作用的dom元素 插入之后执行
    // console.log(el, bindings)
    el.onerror = function() {
      // console.log('图片加载失败了'), 设置备用图片地址
      el.src = bindings.value
    }
  }
}) */
// 注册elementUI 导入语言包

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI)

Vue.config.productionTip = false

// 挂载路由  挂载Vuex
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
}).$mount('#app')

