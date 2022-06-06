// 组件复用
// 但是, 如果有很多个组件, 都要全局注册, 那么又会在main.js 中写很多内容
// `思考`: 我们能在所有组件中, 使用 element-ui 的组件,  他是让我们一个个去全局注册的嘛 ?  (它让我们 Vue.use 一下即可)
// 该文件负责所有的公共组件的全局注册
import PageTools from './PageTools'
import UploadExcel from './UploadExcel'

// 导出
export default {
  install(Vue) {
    Vue.component('PageTools', PageTools)
    Vue.component('UploadExcel', UploadExcel)
  }
}
