import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


const store = new Vuex.Store({
  state: {
    user: undefined
  },
  getters: {
    //返回一个方法, 不会被vue缓存
    loginStatus: (state) => () => {
      //过期时间要大于当前时间
      return state.user && state.user.tokenExpire > new Date().getTime();
    }
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    }
  },
  actions: {}
});

export default store