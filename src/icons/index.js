import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// svg component

// register globally  注册全局组件
Vue.component('svg-icon', SvgIcon)

// svg 生成精灵图
const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
