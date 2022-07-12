<template>
  <div class="box">
  <!-- 搜索栏 -->
     <form class="search">
       <input :placeholder="defaultsearch" type="text" v-model="input">
       <button  class="iconfont icon-xuanze1" @click="getSearchResults"></button>
     </form>
     <!-- 搜索结果 -->
     <div class="bottomBox">
      <div ref="wrapper" class="wrapper">
       <div class="content">
        <ul class="list">

          <li v-for="item in songs" :key="item.id" class="list-item"
          @click="xiangqing(item.id,item.al.picUrl)"
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
  </div>
</template>

<script>
import { useStore } from 'vuex'
import BScroll from '@better-scroll/core'
import '@/assets/fonts/iconfont.css'
import { reactive, toRefs, ref } from 'vue'
import { Search, defaultSearch } from '@/serve/search'
export default {
  setup () {
    const store = useStore()
    const wrapper = ref(null)
    const data = reactive({
      input: '',
      songs: [],
      defaultsearch: ''
    })
    // 点击搜索结果
    const xiangqing = (id, img) => {
      store.commit('showPlayer', { id, img })
      store.commit('getlyricFalse')
    }
    // 默认搜索栏
    const getDefaultSearch = async () => {
      const res = await defaultSearch()
      data.defaultsearch = res.data.realkeyword
    }
    getDefaultSearch()
    // 搜索
    const getSearchResults = async () => {
      if (data.input === '') {
        data.input = data.defaultsearch
      }
      const res = await Search(data.input)
      data.songs = res.result.songs
      data.input = ''

      setTimeout(() => {
        scroll.value = new BScroll(wrapper.value, {
          scrollY: true,
          click: true
        })
      }, 20)
    }
    return { ...toRefs(data), getSearchResults, wrapper, xiangqing, getDefaultSearch, store }
  }

}
</script>

<style scoped lang="scss">
.box {
  display:flex;
  flex-wrap: wrap;
  .search{
    display:flex;
    justify-content:flex-start;
    align-items: center;
    width: 100%;
    height: 50px;
    padding-left: 30px;
    background-color:#efefef;
    // box-shadow: 0 10px 10px 0 rgb(0 0 0 / 5%);
    input{
      width: 15%;
      height: 75%;
      background-color: #fff;
      outline: none;
      border: none;
      color:#666;
      padding-left:10px;
      border-radius:2em;
      transition: all .5s ;
    }
    input:focus{
      width: 70%;

      padding-left:30px;
    }
    input:focus ~ button{

      opacity: 1;
    }
    button{
      opacity: 0;
      width: 40px;
      height: 40px;
      margin-left:16px;
      color:#666;
      border:none;
      background-color: #fff;
      border-radius:50%;
      transition: all .5s;
    }
  }
  .bottomBox {
 .wrapper{
  // background-color: rgb(211, 51, 51);

  // border-radius:.1em;
  width: 100%;
  height: 83vh;
  .content{

    border-radius:1.5em;
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
    text-overflow: ellipsis;/*文字隐藏后添加省略号*/
    white-space: nowrap;/*强制不换行*/
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
}

</style>
