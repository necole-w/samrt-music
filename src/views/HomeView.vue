<template>
  <Header></Header>
  <Tab></Tab>
  <router-view></router-view>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header-vue.vue'
import Tab from '@/components/tab/tab-vue.vue'

export default {
  name: 'HomeView',
  components: {
    Header,
    Tab
  }
}
</script>
