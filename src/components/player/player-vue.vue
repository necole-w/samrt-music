<template>
 <div class="palyer" v-show="playShow">
  <audio
  autoplay="autoplay"
  :src="url"
  ref="audioplay"
  @timeupdate="onTimeupdate"
  ></audio>

  <div class="bigBox">
   <div class="top">
   <span class="songName">{{songName}}</span>
    <span class="back iconfont icon-jiantou" @click="goBack"></span>
      <span class="circle"><span><img ref="xuanzhuan" :src="songImg"></span>
      </span>
      <span class="lyric"><ul ref="lyricUL" class="lyricUL">
   <li v-for="(item, i) in lyricsObjArr" :style="{color: lyricIndex === i ? '#333333' : '#999'}" :key="item.uid" :data-index='i' ref="lyric">{{item.lyric}}</li>
 </ul></span>
   </div>
   <div class="bottom">
   <div
  @touchstart="isDraging = true"><van-slider v-model="beginTime" @change="onChange" :max="songTime"/></div>
<span class="LsongTime">{{Math.floor((Math.round(beginTime/1000))/60) < 10
? '0' + Math.floor((Math.round(beginTime/1000))/60)
: Math.floor((Math.round(beginTime/1000))/60)}}
:
{{Math.floor((Math.round(beginTime/1000))%60) < 10
? '0' + Math.floor((Math.round(beginTime/1000))%60)
: Math.floor((Math.round(beginTime/1000))%60)}}</span>
<span class="RsongTime">{{Math.floor((Math.round(songTime/1000))/60) < 10
? '0' + Math.floor((Math.round(songTime/1000))/60)
: Math.floor((Math.round(songTime/1000))/60)}}
:
{{Math.floor((Math.round(songTime/1000))%60) < 10
? '0' + Math.floor((Math.round(songTime/1000))%60)
: Math.floor((Math.round(songTime/1000))%60)}}</span>
     <span class="pause iconfont icon-zanting1" @click="audiopause"  v-if="isplay"></span>
     <span class="play iconfont icon-bofang2" v-else @click="audioolay"></span>

   </div>
  </div>
 </div>

</template>

<script>
import { Notify } from 'vant'
import '@/assets/fonts/iconfont.css'
import { reactive, toRefs, onUpdated, ref, computed, onBeforeUpdate, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getSongUrl, getSonglyric, getSongTime } from '@/serve/player'
// import route from '@/router/index'
import { useStore } from 'vuex'
export default {
  setup () {
    const router = useRoute()
    const store = useStore()
    const xuanzhuan = ref(null)
    const audioplay = ref(null)
    const lyric = ref(null)
    const lyricUL = ref(null)
    const beginTime = ref(0)
    const lyricsObjArr = ref([])
    const lyricIndex = ref('')
    const playShow = computed(() => {
      return store.state.playShow
    })
    const condition = computed(() => {
      return store.state.condition
    })
    const songId = computed(() => {
      return store.state.singsongId
    })
    const songImg = computed(() => {
      return store.state.singImg
    })
    const playing = computed(() => {
      return store.state.isPlaying
    })
    const data = reactive({
      // songId: '',
      url: '',
      isplay: true,
      lyric: '',
      songTime: 0,
      songName: '',
      isDraging: false

    })
    watch(playing, () => {
      if (playing.value) {
        console.log(playing)
        audioplay.value.play()
        data.isplay = true
        xuanzhuan.value.style.animationPlayState = 'running'
      } else if (!playing.value) {
        console.log(playing)
        audioplay.value.pause()
        data.isplay = false
        xuanzhuan.value.style.animationPlayState = 'paused'
      }
    })
    const onChange = () => {
      audioplay.value.currentTime = Math.floor((Math.round(beginTime.value / 1000)))
      // audioplay.value.play()
      data.isDraging = false
    }
    // 歌词匹配
    const onTimeupdate = () => {
      if (!data.isDraging) {
        beginTime.value = audioplay.value.currentTime * 1000
      }
      // 匹配歌词
      for (let i = 0; i < lyricsObjArr.value.length; i++) {
        // console.log(111)
        // console.log((lyricsObjArr.value[i]))
        if (audioplay.value.currentTime > (parseInt(lyricsObjArr.value[i].time))) {
          const index = lyric.value[i].dataset.index
          if (i === parseInt(index)) {
            lyricIndex.value = i
            lyricUL.value.style.transform = `translateY(${170 - (30 * (i + 1))}px)`
            // console.log(222)
          }
        }
      }
    }

    // 返回
    const goBack = () => {
      // console.log(songId.value)
      store.commit('hidePlayer')
      store.commit('showMinPlayer', true)
      // route.go(-1)
    }
    // 暂停
    const audiopause = () => {
      store.commit('isPalying', false)
    }

    // 播放
    const audioolay = () => {
      store.commit('isPalying', true)
    }
    // 获取歌曲url
    const getUrl = async () => {
      const res = await getSongUrl(songId.value)
      data.url = res.data[0].url
      if (res.data[0].url === null) {
        alert('暂无播放源')
        goBack()
      }
    }
    // 获取歌词
    const formatLyricTime = (time) => { // 格式化歌词的时间 转换成 sss:ms
      const regMin = /.*:/
      const regSec = /:.*\./
      const regMs = /\./

      const min = parseInt(time.match(regMin)[0].slice(0, 2))
      let sec = parseInt(time.match(regSec)[0].slice(1, 3))
      const ms = time.slice(time.match(regMs).index + 1, time.match(regMs).index + 3)
      if (min !== 0) {
        sec += min * 60
      }
      return Number(sec + '.' + ms)
    }
    const getlyric = () => {
      setTimeout(async () => {
        const res = await getSonglyric(songId.value)
        data.lyric = res.lrc.lyric
        // 用正则匹配换行字符对字符串进行分割
        const regNewLine = /\n/
        const lineArr = data.lyric.split(regNewLine) // 每行歌词的数组

        // 用正则来匹配括号里的时间
        const regTime = /\[\d{2}:\d{2}.\d{2,3}\]/
        lineArr.forEach(item => {
          if (item === '') return
          const obj = {}
          const time = item.match(regTime)

          obj.lyric = item.split(']')[1].trim() === '' ? '' : item.split(']')[1].trim()
          obj.time = time ? formatLyricTime(time[0].slice(1, time[0].length - 1)) : 0
          obj.uid = Math.random().toString().slice(-6)
          if (obj.lyric === '') {
            console.log('这一行没有歌词')
          } else {
            lyricsObjArr.value.push(obj)
          }
        })
        // console.log(lyricsObjArr.value)
      })
    }
    // 获取歌曲时长,歌名及img
    const getTime = async () => {
      const { songs: res } = await getSongTime(songId.value)
      data.songTime = res[0].dt
      data.songName = res[0].name
    }

    onBeforeUpdate(() => {
      getUrl()
      getTime()
      // console.log(store.state)
      if (!condition.value) {
        lyricsObjArr.value = []
        getlyric()

        store.commit('getlyricTure') // 这样，就算一直满足执行条件,被调用的方法也只能执行一次；
      }
    })
    onUpdated(() => {

    })
    // 获取歌曲id

    return {
      router,
      ...toRefs(data),
      getUrl,
      audioplay,
      audiopause,
      songImg,
      lyricUL,
      audioolay,
      Notify,
      goBack,
      lyricIndex,
      lyric,
      lyricsObjArr,
      xuanzhuan,
      getlyric,
      onChange,
      formatLyricTime,
      getTime,
      onTimeupdate,
      beginTime,
      playShow,
      songId,
      playing,
      condition
    }
  }

}
</script>

<style lang="scss" scoped>
.palyer{
position:fixed ;
top:0;
left:0;
bottom:0;
right:0;
z-index:9999;
}
.bigBox {
  width: 100%;

  height: 100vh;
// background-color: rgb(196, 99, 99);
overflow: hidden;
.top{
  display: flex;
  flex-direction: column;
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
  .songName{
    position: absolute;
    top:35px;
    height: 50px;
    color:#666;
    font-size:26px;
    // background-color: #efebbb;
  }
.lyric{
  display:flex;
  justify-content: center;
  align-items: start;
  overflow: hidden;
  position: absolute;
  bottom:20px;
  margin-top:30px;
  width: 300px;
  height: 90px;
  // background-color: #fff;
  .lyricUL{

  text-align: center;
    position: absolute;
    top:-112px;
    transition:all 0.5s;
    line-height: 30px;
  }
   i {
    display: inline-block;
}

}
  z-index:1;
  .back{
    position:absolute;
    top:7%;
    left:30%;
    font-size:30px;
    color:#666;
  }
  .circle {
    position:absolute;
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
      border-radius:50%;
      animation:changDeg 20s linear  infinite;
      animation-play-state:running;
    }
  }
  }

}
.bottom{
  top:0;
  position:relative;
   transform:translateY(-50%);
  width: 100%;
  height: 78vh;
   background-image: linear-gradient(90deg,#222325,#3b3c3f,#222325);
   z-index:0;
   padding:0;
  margin:0;
  .pause, .play {
    position:absolute;
    top:75%;
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
    z-index:999;
  }
  .RsongTime {
    display:inline-block;
    color:#ededed;
    position:absolute;
    top: 63.7%;
    left:84%;
  }
  .LsongTime {
    display:inline-block;
    color:#ededed;
    position:absolute;
    top: 63.7%;
    left:4%;
  }
  .van-slider {
    position:absolute;
    top:65%;
    width: 60%;
    left:50%;
    transform:translate(-50%);
  }
}
}

/*无限旋转动画*/
@keyframes changDeg{

0%{

transform: rotate(0deg);

}

100%{

transform: rotate(360deg);

}

}
</style>
