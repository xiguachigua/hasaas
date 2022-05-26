// 导入Vue包
import Vue from 'vue'
// 重置全局样式   相当于base.css
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
// 导入elementui第三方组件库并设置语言包
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n
// 设置全局样式
import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'
// 导入svg精灵图
import '@/icons' // icon
// 导入权限认证
import '@/permission' // permission control

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */

/* if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}
 */

// 注册elementUI 导入语言包

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false

// 挂载路由  挂载Vuex
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
}).$mount('#app')

