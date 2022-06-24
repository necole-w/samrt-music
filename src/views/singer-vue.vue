<template>
<div class="bigBox" ref="bigBox">
  <div class="smallBox">
  <span class="rmartists" ref="rmartists" @click="func">热门歌手&nbsp;&nbsp;TOP10</span>
  <div class="wrapperbox">
    <div class="wrapper" ref="wrapper">
       <div class="box" ref="box">
        <ul class="content" ref="content" >
            <li v-for="item in artists" :key="item.id" @click="songpage(item.img1v1Url,item.id)" >

           <img  v-lazy="item.picUrl" >

           <i>
           {{item.name}}
           </i>
            </li>
        </ul>

       </div>

  </div>
  </div>
  <span class="rmartist" ref="rmartist" @click="title">歌手</span>
  </div>
</div>

</template>

<script>
import { reactive, toRefs, ref } from 'vue'
import { getArtists, getArtist } from '@/serve/artists'
import router from '@/router/index'
import BScroll from '@better-scroll/core'
export default {

  setup () {
    const data = reactive({
    // 热门歌手 artists
      artists: [],
      isshow: true,
      timer: false,
      // 歌手姓氏排名
      artist: []
    })
    // 隐藏热门歌手
    const rmartists = ref(null)
    const rmartist = ref(null)
    const bigBox = ref(null)
    const box = ref(null)
    const wrapper = ref(null)
    const func = delayPrint()
    // 点击歌手跳转页面
    const songpage = (img, id) => {
      router.push({ path: '/songs', query: { img, id } })
    }

    // 未完成提示
    const title = () => {
      console.log(11)
      alert('该功能还在加急开发中')
    }
    // 折叠防抖?
    function delayPrint () {
      return function () {
        if (data.timer) {
          // console.log(1);
          // clearTimeout(timer)
        } else {
          data.timer = true
          Change()
        }
      }
    }
    // 折叠动画
    const Change = () => {
      if (data.isshow) {
        wrapper.value.style.transform = 'translateY(-1000px)'
        setTimeout(() => {
          wrapper.value.style.display = 'none'
          rmartists.value.style.boxShadow = 'none'
          rmartist.value.style.transition = 'none'
          rmartist.value.style.transform = 'translateY(0)'
          // console.log(3)
        }, 500)
        rmartist.value.style.transform = 'translateY(-83vh)'
        data.isshow = false
      } else {
        wrapper.value.style.display = 'block'
        rmartist.value.style.transform = 'translateY(-83vh)'
        rmartists.value.style.boxShadow = ' 0 10px 10px 0 rgb(0 0 0 / 5%)'
        setTimeout(() => {
          rmartist.value.style.transition = 'all .5s'

          rmartist.value.style.transform = 'translateY(83vh)'
          rmartist.value.style.transform = 'translateY(0)'
          wrapper.value.style.transform = 'translateY(0)'
        })

        data.isshow = true
      }
      data.timer = false
    }

    // 获取热门歌手列表   实例化betterscroll
    const getSingers = async () => {
      // wrapper.value.height = wrapperHeight()
      const result = await getArtists()
      data.artists = result.artists

      setTimeout(() => {
        scroll.value = new BScroll(wrapper.value, {
          scrollY: true,
          click: true,
          stopPropagation: true
        })
      }, 20)
      setTimeout(() => {
        scroll.value = new BScroll(bigBox.value, {
          scrollY: true,
          click: true,
          stopPropagation: true
        // probeType: 3
        })
      }, 20)
    }
    getSingers()
    // 获取全部歌手
    const getSinger = async () => {
      const res = await getArtist()
      data.artist.push(res.artists)
      // console.log(data.artist)
    }
    getSinger()

    return { getSingers, ...toRefs(data), Change, box, wrapper, rmartists, bigBox, rmartist, func, getSinger, title, songpage }
  }
}
</script>

<style lang="scss" type="scoped">

.rmartists{
  width: 100%;
  display:inline-block;
  height: 50px;
  color: rgb(102, 102, 102);
  font-weight: 700;
  line-height: 50px;
  padding-left:20px;
  z-index: -1;
  box-shadow: 0 10px 10px 0 rgb(0 0 0 / 5%);
}
.wrapperbox{
  height: 100%;
  overflow: hidden;
}
.rmartist{
  width: 100%;
  display:inline-block;
  height: 50px;
  color: rgb(102, 102, 102);
  font-weight: 700;
  line-height: 50px;
  padding-left:20px;

  transition: all .5s;
  box-shadow: 0 10px 10px 0 rgb(0 0 0 / 5%);
}
.bigBox{
  height: 90vh;
  overflow: hidden;
}
.wrapper
   {
  transition: all .5s ;
  height: 83vh;
  overflow: hidden;
  z-index: 1;
    .box{
    padding: 0 10px;
    }
    .content
   {
    // height:200%;
    padding:0;
    // margin:0;
    // overflow: hidden;
li
   {
    // height: 100%;
    // display:flex;
    // flex-wrap: wrap;
    padding: 10px 0;
    list-style: none;
    border-bottom: 1px solid #ccc;
    i{

    width: 255px;
    height: 75px;
    line-height: 25px;
    font-size: 20px;
    color:#333;
    font-style: normal;
   }
   img{
 vertical-align: middle;
  // float:left;
  width: 75px;
  height: 75px;
  border-radius:7px;
  margin-right:20px;
  // overflow: hidden;
  background-color: rgb(186, 83, 83);

}
    }
   }
    }

</style>
