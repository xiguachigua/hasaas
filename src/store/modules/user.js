import { getToken, setToken, removeToken } from '@/utils/auth'
import { reqLogin, reqGetBaseInfo, reqGetProfle } from '@/api/user'
const state = {
  token: getToken() || '',
  userInfo: {}
}
const mutations = {
  setToken(state, newToken) {
    state.token = newToken
    // 永久储存
    setToken(newToken)
  },

  setUserInfo(state, newUserInfo) {
    state.userInfo = newUserInfo
  },
  // 退出功能  // 删除token
  removeToken(state) {
    state.token = null
    // 清除vuex token的同时, 同步到本地cookies中移出
    removeToken()
  },
  // 退出清除数据
  removeUserInfo(state, newUserInfo) {
    state.userInfo = {}
  }

}
const actions = {
  async  login(context, data) {
    const res = await reqLogin(data)
    context.commit('setToken', res.data)
  },
  async getUserInfo(context) {
    const res1 = await reqGetProfle()
    const res2 = await reqGetBaseInfo(res1.data.userId)
    const res = { ...res1.data, ...res2.data }
    context.commit('setUserInfo', res)
  },
  // 退出的action
  logout(context) {
    // 删除token
    context.commit('removeToken')
    // 删除用户资料
    context.commit('removeUserInfo')
  }
}
const getters = {

}

export default ({
  // 命名空间
  namespaced: true,
  state,
  mutations, actions, getters
})

