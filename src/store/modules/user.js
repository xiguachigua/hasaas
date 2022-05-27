import { getToken, setToken } from '@/utils/auth'
import { reqLogin } from '@/api/user'
const state = {
  token: getToken() || ''
}
const mutations = {
  setToken(state, newToken) {
    state.token = newToken
    // 永久储存
    setToken(newToken)
  }
}
const actions = {
  async  login(context, data) {
    const res = await reqLogin(data)
    context.commit('setToken', res.data)
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

