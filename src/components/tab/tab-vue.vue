<template>
  <div class="tab">
   <router-link
   active-class="select"
   class="tab-item"
   v-for="item in tabs"
   :key="item.path"
   :to="item.path"
   >
   <span class="tab-link">{{item.name}}</span>
   </router-link>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tabs: [
        {
          name: '推荐',
          path: '/recommend'
        },
        {
          name: '歌手',
          path: '/singer'
        },
        {
          name: '排行',
          path: '/top-list'
        },
        {
          name: '搜索',
          path: '/search'
        }
      ]
    }
  }
}
</script>

<style  lang="scss" type="scoped">
.tab{
  display: flex;
  height: 44px;
  background-image: linear-gradient(90deg,#222325,#3b3c3f,#222325);
  line-height: 44px;
}
.tab-item{
    flex: 1;
    text-align: center;
text-decoration: none;
color:hsla(0,0%,100%,.7);
  }
.tab-link{
padding-bottom: 5px;
  }
.select{

        color:#e5e5e5;
        // background-color: #fff;

    }
</style>
