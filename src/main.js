import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Swipe, SwipeItem, List } from 'vant'
import lazyPlugin from 'vue3-lazy'

const app = createApp(App)

app
  .use(lazyPlugin, {
    loading: require('@/assets/images/logo.png'),
    error: require('@/assets/images/logo.png')
  })
  .use(List)
  .use(Swipe)
  .use(SwipeItem)
  .use(store).use(router).mount('#app')
