import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: JSON.parse(window.localStorage.getItem('user-info') || null)
  },
  getters: {
  },
  mutations: {
    SETUSER (state, payload) {
      state.user = JSON.parse(payload)
      window.localStorage.setItem('user-info', payload)
    }
  },
  actions: {
  },
  modules: {
  }
})
