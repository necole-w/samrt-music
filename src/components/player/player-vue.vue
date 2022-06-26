<template>
  <audio
  autoplay="autoplay"
  :src="url"
  ref="audioplay"
  ></audio>

  <div class="bigBox">
   <div class="top"><span class="circle"><span><img src="@/assets/images/logo.png"></span></span></div>
   <div class="bottom">
     <span class="pause iconfont icon-zanting1" @click="audiopause"  v-if="isplay"></span>
     <span class="play iconfont icon-bofang2" v-else @click="audioolay"></span>

   </div>
  </div>

</template>

<script>
import '@/assets/fonts/iconfont.css'
import { reactive, toRefs, onBeforeMount, ref } from 'vue'
import { useRoute } from 'vue-router'
import { getSongUrl } from '@/serve/player'
export default {
  setup () {
    const audioplay = ref(null)
    const data = reactive({
      songId: '',
      url: '',
      isplay: true
    })
    // 暂停
    const audiopause = () => {
      audioplay.value.pause()
      data.isplay = false
    }
    // 播放
    const audioolay = () => {
      audioplay.value.play()
      data.isplay = true
    }
    // 获取歌曲url
    const getUrl = async () => {
      const res = await getSongUrl(data.songId.id)
      console.log(res)
      console.log(res.data[0].url)
      data.url = res.data[0].url
      if (res.data[0].url === null) alert('暂无播放源')
    }
    onBeforeMount(() => {
      getUrl()
    })
    // 获取歌曲id
    const router = useRoute()
    data.songId = router.query
    return { router, ...toRefs(data), getUrl, audioplay, audiopause, audioolay }
  }

}
</script>

<style lang="scss" scoped>
.bigBox {
  width: 100%;

  height: 100vh;
background-color: rgb(196, 99, 99);
overflow: hidden;
.top{
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  top:0 ;
  left:50%;
  transform:translateX(-50%);
  width: 200%;
  height:61.8vh;
  background-color: #ededed;
  border-radius:0 0 50% 50%;

  z-index:1;
  .circle {
    display: inline-block;
    width: 300px;
    height: 300px;
    background-color: #ededed;
    border-radius: 50%;
    z-index:999;
    box-shadow: 0 0 15px 0 rgb(0 0 0 / .3);
    span {

    display: inline-block;
    position: absolute;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
    width: 280px;
    height: 280px;
    border-radius: 50%;
    background-color: #ededed;
    z-index:9;
    img{
      width: 100%;
    }
  }
  }

}
.bottom{
   transform:translateY(-50%);
  width: 100%;
  height: 78vh;
   background-image: linear-gradient(90deg,#222325,#3b3c3f,#222325);
   z-index:-1;
   padding:0;
  margin:0;
  .pause, .play {
    position:relative;
    top:70%;
    left:50%;
    transform:translate(-50%);
    display: inline-block;
    width: 75px;
    height: 75px;
    background-color: #ededed;
    box-shadow: 0 0 5px 0 rgba(255, 255, 255, 0.9);
    border-radius: 50%;
    text-align: center;
    line-height:75px;
    color:#222325;
    font-size:40px;
    font-weight: 800;
  }
}
}
</style>
