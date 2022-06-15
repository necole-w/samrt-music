import { createRouter, createWebHashHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import Recommend from '@/views/recommend-vue.vue'
import Search from '@/views/search-vue.vue'
import Singer from '@/views/singer-vue.vue'
import TopList from '@/views/top-list-vue.vue'

const routes = [
  { path: '/', redirect: '/recommend' },
  {
    path: '/recommend',
    name: 'recommend',
    component: Recommend
  },
  {
    path: '/search',
    name: 'search',
    component: Search
  },
  {
    path: '/singer',
    name: 'singer',
    component: Singer
  },
  {
    path: '/top-list',
    name: 'top-list',
    component: TopList
  }

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
