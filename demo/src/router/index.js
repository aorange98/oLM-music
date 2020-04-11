import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)


import home from './home/home.js'
import find from './find/find.js'
import search from './search/search.js'
import playdetail from './playdetail/playdetail.js'
import rankingplaydetail from './playdetail/rankingplaydetail.js'

// 路由表 已经做了抽离
const routes = [
  {
    path: '/',
    redirect:'/home',
  },
  home,
  find,
  search,
  playdetail,
  rankingplaydetail
]



const router = new Router({
  mode: 'history',
  routes
})

export default router
