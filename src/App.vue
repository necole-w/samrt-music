<template>
  <!-- <Home></Home> -->
  <div class="box">
  <transition name="van-slide-up">
  <Player></Player>
  </transition>

  <router-view></router-view>
  <transition name="van-slide-up">

  <minPlayer></minPlayer>
  </transition>
  </div>
</template>

<script>
// import { watch } from 'vue'
// import Home from '@/views/HomeView.vue'
import Player from '@/components/player/player-vue.vue'
import minPlayer from '@/components/player/minplayer-vue.vue'
import '@/assets/css/global.css'
export default {
  components: {
    Player,
    minPlayer
  },
  setup () {
    return { }
  }
}
</script>

<style lang="scss" scoped>
.box {
height: 100%;
}

</style>
