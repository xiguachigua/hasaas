import { getToken, setToken } from '@/utils/auth'
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

