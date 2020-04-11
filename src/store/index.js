import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const user = {
  state: { user: undefined },
  getter: {
    //返回方法, 不会缓存
    loginStatus: (state) => () => {

      return false;
    }
  },
  mutations: {},
  actions: {}
}

export default new Vuex.Store({

  modules: {
    'user': user
  }
})