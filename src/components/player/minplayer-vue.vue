<template>
  <div class="minplayer" v-show="minPlayerShow" ref="minplayer">
  <span class="img" @click="goPlayer"><img :src="img" ref="imgRef"></span>
  <span class="songName">{{name}}</span>
  <span ref="iconfont" class="play iconfont icon-zanting1" @click="zanting"></span>
  </div>

</template>

<script>
import { getSongTime } from '@/serve/player'
import { useStore } from 'vuex'
import { computed, ref, onMounted, onBeforeUpdate } from 'vue'
import '@/assets/fonts/iconfont.css'
export default {
  setup () {
    const iconfont = ref(null)
    const name = ref('')
    const minplayer = ref(null)
    const store = useStore()
    const img = computed(() => { return store.state.singImg })
    const minPlayerShow = computed(() => { return store.state.minPlayerShow })
    const id = computed(() => { return store.state.singsongId })
    const playing = computed(() => {
      return store.state.isPlaying
    })
    const getimg = () => {
      if (img.value === '') {
        store.commit('showMinPlayer', false)
      }
    }
    // 播放与暂停
    const zanting = () => {
      if (playing.value) {
        store.commit('isPalying', false)
        iconfont.value.className = 'play iconfont icon-bofang2'
      } else {
        store.commit('isPalying', true)
        iconfont.value.className = 'play iconfont icon-zanting1'
      }
    }
    // 获取歌曲时长,歌名及img
    const getName = async () => {
      const { songs: res } = await getSongTime(id.value)
      name.value = res[0].name
    }
    const goPlayer = () => {
      store.commit('showPlayer')
      store.commit('showMinPlayer', false)
    }
    onBeforeUpdate(() => {
      getName()
      getimg()
    }
    )
    onMounted(() => {
      getimg()
    })
    return { img, store, getimg, minPlayerShow, minplayer, id, getName, name, goPlayer, playing, zanting, iconfont }
  }
}
</script>

<style lang="scss" scoped>
.minplayer{
  display:flex;
  align-items:center;
  justify-content:space-around;
  position: fixed;
  bottom:-33%;
  left:50%;
  border-radius: 3em;
  background-color: rgba(204, 204, 204,.7);
  // filter:blur(2px);
  height: 60px;
  width: 95%;
  transform: translate(-50%,-300px);
  .img{
    display: inline-block;
    height: 50px;
    width: 50px;
    overflow: hidden;
z-index:99;
border-radius: 50%;
    img{
      height: 100%;
      width: 100%;
    }
  }
  .songName{
    font-size:20px;
  }
}
</style>
