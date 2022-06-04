// 导入路由

import router from '@/router'
import store from '@/store'

// 导入NProgress进度条
import NProgress from 'nprogress' // 引入一份进度条插件
import 'nprogress/nprogress.css' // 引入进度条样式4
// 白名单
const whihtList = ['/login', '/404']

// 设置路由前置守卫
router.beforeEach(async(to, from, next) => {
  NProgress.start()
  const token = store.getters.token
  if (token) {
    if (to.path === '/login') {
      next('/')
      NProgress.done()
    } else {
      if (!store.state.user.userInfo.userId) {
        await store.dispatch('user/getUserInfo')
      }
      next()
    }
  } else {
    if (whihtList.includes(to.path)) {
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  }
})
// 设置路由后置守卫
router.afterEach((to, from) => {
  setTimeout(function() {
    NProgress.done()
  }, 500)
})
