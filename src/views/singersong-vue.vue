<template>

 <div class="img">
<span class="back" @click="goBack"><img src="@/assets/images/back.png"></span>
<span class="singName">{{name}}</span>
<img :src="img"></div>
   <div class="horizontal-container">
    <div class="scroll-wrapper" ref="wrapper">
      <div class="scroll-content">
        <ul>
          <li @click="goPlayer(item.id,item.al.picUrl)" v-for="item in song" :key="item.id">{{item.name}}</li>
        </ul>
      </div>
    </div>
  </div>

</template>

<script >
import { useStore } from 'vuex'
import BScroll from '@better-scroll/core'
import { ref, onMounted, reactive, toRefs } from 'vue'
import { useRoute } from 'vue-router'
import { getArtistsongs } from '@/serve/artists'
import route from '@/router/index'
export default {
  setup () {
    const store = useStore()
    const data = reactive({
      id: '',
      img: '',
      name: ''
    })
    // 点击歌曲 显示播放页面
    const goPlayer = (id, img) => {
      store.commit('showPlayer', { id, img })
      store.commit('getlyricFalse')
    }
    const wrapper = ref(null)
    const song = ref({})
    const router = useRoute()
    // 返回上一页
    const goBack = () => {
      route.push({ path: '/singer' })
    }
    // 获取歌手id及img
    const getSinger = () => {
      // console.log(router)
      data.id = router.query.id
      data.img = router.query.img
      data.name = router.query.name
    }
    getSinger()
    // 获取歌手热门音乐前50首
    const Artistsongs = async () => {
      const res = await getArtistsongs(data.id)
      song.value = res.songs
      // console.log(song.value)
      setTimeout(() => {
        scroll.value = new BScroll(wrapper.value, {
          scrollY: true,
          click: true
        })
      }, 20)
    }
    Artistsongs()
    onMounted(() => {

    }

    )

    return { wrapper, router, getSinger, ...toRefs(data), Artistsongs, song, goBack, goPlayer, store }
  }
}
</script>

<style lang="scss" scoped>
.img{
  padding:10px 10px 0px 10px;
  height: 390px;
  box-shadow: 0 10px 10px 0 rgb(0 0 0 / 5%);
  overflow: hidden;
  img{
    width: 100%;
  }
  .back{
    position: absolute;
    top:20px;
    left:30px;
    width: 30px;
    height:30px;
    // background-color: rgb(194, 74, 74);
  }
  .singName{
    position: absolute;
    top:20px;
    left:50%;
    transform: translateX(-50%);
    // width: 30px;
    font-weight:700 ;
    height:30px;
    color:rgb(156, 156, 156);
        font-size: 20px;
    // background-color: rgb(194, 74, 74);
  }
}
.horizontal-container{
  width: 100%;
  // background-color: rgb(213, 99, 99);
  .scroll-wrapper{

    margin: 0 10px;
    height: 47vh;
    border: 1px solid #ccc;
    overflow: hidden;
    // background-color: rgb(55, 164, 28);
    .scroll-content
      {
        // height: 100%;
      //  background-color: rgb(190, 32, 32);
       li {
        padding: 0 30px ;
        list-style: none;
        border-bottom: 1px solid #ccc;
        width: 100%;
        height: 75px;
        word-break: break-all;
        overflow: hidden;
        line-height: 75px;
        font-size: 20px;
        color:#333;
        font-style: normal;}
       }

  }

}

</style>
