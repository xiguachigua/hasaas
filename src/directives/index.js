// 负责管理所有的自定义指令
// v-imgerror ="备用图地址"
export const imgerror = {
  inserted(el, binding) {
    // console.log(el, binding)
    el.onerror = function() {
    //   console.log('图片加载失败')
      el.src = binding.value
    }
  }
}

// v-color="字体颜色"
export const color = {
  inserted(el, binding) {
    el.style.color = binding.value
  }
}
