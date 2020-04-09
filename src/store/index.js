import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const user = {
  state: {},
  mutations: {},
  actions: {}
}

export default new Vuex.Store({

  modules: {
    'user': user
  }
})