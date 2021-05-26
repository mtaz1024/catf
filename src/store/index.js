import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      // user: window.localStorage.getItem('user' || '[]') == null ? '' : JSON.parse(window.localStorage.getItem('user' || '[]')),
      username: window.localStorage.getItem('user' || '[]') == null ? '' : JSON.parse(window.localStorage.getItem('user' || '[]')).username,
      userId: window.localStorage.getItem('user' || '[]') == null ? '' : JSON.parse(window.localStorage.getItem('user' || '[]')).userId,
      avatar: window.localStorage.getItem('user' || '[]') == null ? '' : JSON.parse(window.localStorage.getItem('user' || '[]')).avatar
    }
  },
  mutations: {
    login(state, user){
      state.user = user
      window.localStorage.setItem("user", JSON.stringify(user))
      // window.localStorage.setItem('user', JSON.stringify(user))
      // window.localStorage.removeItem("user")
    },
    logout(state){
      state.user = {}
      window.localStorage.removeItem("user")
    }
  },
  actions: {
  },
  modules: {
  }
})
