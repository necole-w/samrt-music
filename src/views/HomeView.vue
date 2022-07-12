<template >
 <div>
 <Header></Header>
  <Tab></Tab>

  <router-view v-slot="{ Component }">
   <transition :name="transitionName">
     <keep-alive>
        <component :is="Component" />
     </keep-alive>

    </transition>
</router-view>

</div>

</template>

<script>
import '@/assets/css/fold.css'
// @ is an alias to /src
import { reactive, toRefs } from 'vue'
import { onBeforeRouteUpdate } from 'vue-router'
import Header from '@/components/Header-vue.vue'
import Tab from '@/components/tab/tab-vue.vue'
// import router from '@/router/index.js'
export default {
  setup () {
    const data = reactive({
      transitionName: 'fold-left'
    })
    onBeforeRouteUpdate((to, from) => {
      if (to.meta.index > from.meta.index) {
        data.transitionName = 'fold-left'
        // console.log(data.transitionName)
      } else {
        data.transitionName = 'fold-right'
      }
    })
    return { ...toRefs(data) }
  },
  name: 'HomeView',
  components: {
    Header,
    Tab
  }
}
</script>

<style>

</style>
