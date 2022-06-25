<template>
 <div class="horizontal-container">
    <div class="scroll-wrapper" ref="wrapper">
      <div class="scroll-content">
        <ul>
          <li @click="goPlayer(item.id)" v-for="item in songlist" :key="item.id">{{item.name}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from '@better-scroll/core'
import { reactive, toRefs, ref } from 'vue'
import route from '@/router/index'
import { useRoute } from 'vue-router'
import { get } from '@/serve/base'
export default {
  setup () {
    const wrapper = ref(null)
    const data = reactive({
      Id: '',
      songlist: []
    })
    const router = useRoute()
    // 获取歌单id
    const getId = () => {
      data.Id = router.query.id
    }
    getId()
    // 点击歌曲 进入播放页面
    const goPlayer = (id) => {
      route.push({ path: '/player', query: { id } })
    }
    // 获取歌单歌曲列表
    const getSongList = async () => {
      const res = await get(`/playlist/track/all?id=${data.Id}&limit=50`)
      data.songlist = res.songs
      setTimeout(() => {
        scroll.value = new BScroll(wrapper.value, {
          scrollY: true,
          click: true
        })
      }, 20)
    }
    getSongList()
    return { router, getId, ...toRefs(data), goPlayer, getSongList, wrapper }
  }

}
</script>

<style lang="scss" scoped>
.horizontal-container{
  width: 100%;
  // background-color: rgb(213, 99, 99);
  .scroll-wrapper{

    margin: 0 10px;
    height: 100vh;
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
