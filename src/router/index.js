import { createRouter, createWebHashHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import Recommend from '@/views/recommend-vue.vue'
import Search from '@/views/search-vue.vue'
import Singer from '@/views/singer-vue.vue'
// import TopList from '@/views/top-list-vue.vue'
import Songs from '@/views/singersong-vue.vue'
import Home from '@/views/HomeView.vue'
// import player from '@/components/player/player-vue.vue'
import RecommendList from '@/components/recommendedList-vue.vue'

const routes = [
  { path: '/', redirect: '/recommend' },
  {
    path: '/home',
    redirect: '/recommend',
    component: Home,
    children: [{
      path: '/recommend',
      name: 'recommend',
      meta: {
        index: 1,
        keepAlive: true
      },
      component: Recommend
    },
    {
      path: '/singer',
      name: 'singer',
      meta: {
        index: 2,
        keepAlive: true
      },
      component: Singer
    },
    {
      path: '/search',
      name: 'search',
      meta: {
        index: 4,
        keepAlive: true
      },
      component: Search
    }]
  },
  {
    path: '/songs',
    name: 'songs',
    meta: {
      index: 5,
      keepAlive: true
    },
    component: Songs
  },
  {
    path: '/recommendList',
    name: 'recommendList',
    meta: {
      keepAlive: true
    },
    component: RecommendList
  }

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
