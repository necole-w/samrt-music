<template>
<div><!-- 轮播图 -->
  <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
  <van-swipe-item
   v-for="banner in banners"
   :key="banner.targetId">
  <img :src="banner.pic">
  </van-swipe-item>
</van-swipe>
<!-- 歌单推荐 -->
<span class="gdRecommend">热门歌单推荐</span>
 <div class="pullup">
    <div ref="scroll" class="pullup-wrapper">
      <div class="pullup-content">
        <ul class="pullup-list">

          <li v-for="item in list" :key="item.id" class="pullup-list-item">

          <img  v-lazy="item.picUrl">

           <i>
           {{item.name}}
           </i>
          </li>
        </ul>
        <div class="pullup-tips">
          <div v-if="!isPullUpLoad" class="before-trigger">
            <span class="pullup-txt">暂无更多歌单</span>
          </div>
          <div v-else class="after-trigger">
            <span class="pullup-txt">暂无更多歌单</span>
          </div>
        </div>
      </div>
    </div>
  </div></div>
</template>

<script>
import BScroll from '@better-scroll/core'
import Pullup from '@better-scroll/pull-up'
import { reactive, toRefs } from 'vue'
import { getRecommend, getGdRecommend } from '../serve/recommended'

BScroll.use(Pullup)
export default {
  data () {
    return {
      isPullUpLoad: false,
      data: 30
    }
  },
  mounted () {
    this.initBscroll()
  },
  methods: {
    initBscroll () {
      this.bscroll = new BScroll(this.$refs.scroll, {
        pullUpLoad: true
      })

      this.bscroll.on('pullingUp', this.pullingUpHandler)
    },
    async pullingUpHandler () {
      this.isPullUpLoad = true

      await this.requestData()

      this.bscroll.finishPullUp()
      this.bscroll.refresh()
      this.isPullUpLoad = false
    },
    // requestData () {
    //   this.getGd()
    // }
    async requestData () {
      try {
        const newData = await this.ajaxGet(/* url */)
        this.data += newData
      } catch (err) {
        // handle err
        console.log(err)
      }
    },
    ajaxGet (/* url */) {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(20)
        }, 1000)
      })
    }
  },
  setup () {
    const data = reactive({
      // 轮播图
      banners: '',
      Recommended: [],
      // 推荐歌曲
      list: []
    })
    // 获取轮播图数据
    const getBanner = async () => {
      const result = await getRecommend()
      // console.log(result)
      data.banners = result.banners
      // console.log(data.banners)
    }
    getBanner()
    // 获取推荐歌单
    const getGd = async () => {
      const result = await getGdRecommend()
      data.list.push(...result.result)
      // console.log(data.list)
    }
    getGd()
    return { ...toRefs(data), getBanner, getGd }
  }

}
</script >

<style lang="scss" type="scoped">
.gdRecommend{
  width: 100%;
  display:inline-block;
  height: 50px;
  color: rgb(102, 102, 102);
  font-weight: 700;
  line-height: 50px;
  padding-left:20px;

  box-shadow: 0 10px 10px 0 rgb(0 0 0 / 5%);
}
.my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    background-color: #39a9ed;
  }
.van-swipe{
  height: 161px;
  // width: 100%;

}
.van-swipe-item>img{
width: 100%;
height: 100%;
}
.pullup
  {height: 600px}
.pullup-wrapper
   { height: 600px;
    padding: 0 10px;
    border: 1px solid #ccc;
    overflow: hidden}
.pullup-list
   { padding: 0;

   }
.pullup-list-item

   {
    display:flex;
    // flex-wrap: wrap;
    padding: 10px 0;
    list-style: none;
    border-bottom: 1px solid #ccc;
    i{

    width: 255px;
    height: 75px;
    word-break: break-all;
    overflow: hidden;
    line-height: 25px;
    font-size: 17px;
    color:#333;
    font-style: normal;
   }
   img{
  // float:left;
  width: 75px;
  height: 75px;
  border-radius:7px;
  margin-right:20px;
  // overflow: hidden;
  // background-color: rgb(186, 83, 83);

}
    }

.pullup-tips
    {padding: 20px;
    text-align: center;
    color: #999}
</style>
