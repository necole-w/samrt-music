<template>
<van-sticky >
      <div class="backBox">
         <span class="back iconfont icon-jiantou"      @click="goBack">
         </span>
      </div>
       </van-sticky>
<div class="bottomBox">

      <div ref="wrapper" class="wrapper">

       <div class="content">

        <ul class="list">
          <li  v-for="item in songlist" :key="item.id" class="list-item"
          @click="goPlayer(item.id,item.al.picUrl)"
          >

          <img  v-lazy="item.al.picUrl">

           <i>
           {{item.name}}
           </i>
          </li>
        </ul>
      </div>
    </div>
  </div>

</template>

<script>
import '@/assets/fonts/iconfont.css'
import { useStore } from 'vuex'
import BScroll from '@better-scroll/core'
import { reactive, toRefs, ref } from 'vue'
import { useRoute } from 'vue-router'
import { get } from '@/serve/base'
import route from '@/router/index'
export default {
  setup () {
    const store = useStore()
    const wrapper = ref(null)
    const data = reactive({
      Id: '',
      songlist: []
    })
    const goBack = () => {
      // router.push({ path: `${route.options.history.state.back}` })
      route.go(-1)
    }
    const router = useRoute()
    // 获取歌单id
    const getId = () => {
      data.Id = router.query.id
    }
    getId()
    // 点击歌曲 进入播放页面
    const goPlayer = (id, img) => {
      // console.log(data.songlist)
      store.commit('showPlayer', { id, img })
      store.commit('getlyricFalse')
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
    return { router, getId, ...toRefs(data), goPlayer, getSongList, wrapper, store, goBack }
  }

}
</script>

<style lang="scss" scoped>
.backBox{
  position:sticky;
   background-image: linear-gradient(90deg,#222325,#3b3c3f,#222325);
    height: 50px;
  box-shadow: 0 10px 10px 0 rgb(0 0 0 / 5%);
  line-height: 50px;
  z-index:999;
.back{
  font-size:30px;
margin-left:20px;
display: inline-block;
color:#ededed;
  transform: rotate(90deg);
    // background-color: rgb(196, 40, 40);
  }

  }
.bottomBox {

 .wrapper{
  // background-color: rgb(211, 51, 51);

  border-radius:.1em;
  width: 100%;
  height: 100vh;

  .content{

    border-radius: 50px;
     width: 100%;
     background-color:#fff;
    .list{
      padding:0 0.5em;
        .list-item{
    border-bottom: 1px solid #ccc;
     padding:10px;
      display:flex;
img{
  width: 25%;
  border-radius: 10%;
}
i{
    overflow: hidden;
    line-height: 500%;
    font-size: 17px;
    padding-left:30px;
    color:#333;
    font-style: normal;
}
        }

    }
  }
 }
}
</style>
