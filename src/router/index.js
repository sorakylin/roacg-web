import Vue from 'vue'
import VueRouter from 'vue-router'

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
      path: 'item-list',
      component: () => import('@/views/tc/TcItemList')
    }, {
      path: 'mytc',
      component: () => import('@/views/tc/TcMy')
    }, {
      path: 'teams',
      component: () => import('@/views/tc/TcTeams')
    }]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router