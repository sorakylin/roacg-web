import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    component: () => import('@/views/Home')
  }, {
    path: '/login',
    component: () => import('@/views/Login')
  }, {
    path: '/register',
    component: () => import('@/views/Register')
  },
  {
    path: '/tc',
    component: () => import('@/views/tc/TranslationCollaborationHome'),
    children: [{
      path: '',
      component: () => import('@/views/tc/TcSquare')
    }, {
      path: 'tcinfo',
      component: () => import('@/views/tc/TcInfo')
    }, {
      path: 'mytc',
      meta: {
        requireAuth: true
      },
      component: () => import('@/views/tc/TcMy')
    }]
  }, {
    path: '/tc/team-detail/:teamId',
    component: () => import('@/views/tc/TcTeamDetail')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


// 在页面刷新时，重新赋值token
if (localStorage.getItem('token')) {

  store.commit('setUser', {
    token: localStorage.getItem('token'),
    tokenExpire: parseInt(localStorage.getItem('tokenExpire')),
    ...JSON.parse(localStorage.getItem('ru'))
  })
}


router.beforeEach((to, from, next) => {

  //这里的requireAuth为路由中定义的 meta:{requireAuth:true}  如果不是 true 则直接放行
  if (!to.matched.some(r => r.meta.requireAuth)) {
    next();
    return;
  }

  //已登录放行
  if (store.getters.loginStatus()) {
    next();
  } else { //重定向到 login
    window.location.href = "/";
  }

})


export default router