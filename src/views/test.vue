<template>
  <div class="hello">
    <div class="singer" id="singer">
      <div class="singer-top-tag">{{singerTopTag | filterSingerTag}}</div>
      <ul class="singer-ul">
        <li v-for="(item, index) in list" :key="index" class="singer-ul-li">
          <div class="singer-tag" :id="item.tag">{{item.tag | filterSingerTag}}</div>
          <ul>
            <li v-for="(fitem, findex) in item.data" :key="findex">
              <img :src="`https://y.gtimg.cn/music/photo_new/T001R300x300M000${fitem.Fsinger_mid}.jpg?max_age=2592000`">
              <div>{{fitem.Fsinger_name}}</div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <div class="sort">
      <ul>
        <li
        v-for="(item, index) in sortList"
        :key="index"
        @click="jumpTag(item)"
        :class="{current:currentSort == item ? true : false}"
        >
          {{item == `hot` ? `热` : item}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'HelloWorld',
  data () {
    return {
      list: [], //  歌手列表
      sortList: [], //  侧栏排序列表
      currentSort: 'hot', //  当前排序的标签
      singerTopTag: 'hot' //  歌手栏头部的标签名字
    }
  },
  mounted () {
    this.testData()
    //  监听滚动条
    window.addEventListener('scroll', this.handleScroll)
  },
  unmounted () {
    //  页面摧毁的时候要关闭监听
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll () {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      let offsetTop = 0
      this.list.forEach((item, index) => {
        //  获取每个排序标签的位置
        offsetTop = document.querySelectorAll('.singer-ul-li')[index].offsetTop
        //  当前滚动条的位置 和 当前的标签偏移顶部的距离进行对比
        //  每一个歌手的li标签的高度必须要保持一致，我这里的高度是70，可以计算自己项目的内容的具体高度进行修改
        if (scrollTop > offsetTop && scrollTop < (offsetTop + 70 * item.data.length)) {
          this.singerTopTag = item.tag
          this.currentSort = item.tag
        }
      })
    },
    //  请求数据
    testData () {
      axios.get('https://c.y.qq.com/v8/fcg-bin/v8.fcg?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=jsonp&channel=singer&page=list&key=all_all_all&pagesize=100&pagenum=1&hostUin=0&needNewCode=0&platform=yqq&jsonpCallback=jp1')
        .then(res => {
          res = res.data.substring(5, res.data.length - 1)
          res = JSON.parse(res).data.list
          res = res.sort((a, b) => a.Findex.localeCompare(b.Findex))
          res.forEach((item, index) => {
          //　添加侧栏排序
            item.Findex = item.Findex == 9 ? 'hot' : item.Findex
            this.sortList.push(item.Findex)
          })
          //  去除重复
          this.sortList = new Set(this.sortList)
          this.sortList = [...this.sortList]
          //  添加排序标签和歌手列表
          this.sortList.forEach(e => {
            this.list.push({
              tag: e,
              data: res.filter(i => i.Findex == e)
            })
          })
        })
    },
    //  跳转标签
    jumpTag (i) {
      this.singerTopTag = i
      this.currentSort = i
      document.querySelector(`#${i}`).scrollIntoView()
    }
  },
  filters: {
    filterSingerTag (i) {
      return i == 'hot' ? '热门' : i
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  position: relative;
  background-color: #222;
}

.singer {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #222;
}

.singer-top-tag {
  position: fixed;
  top: 0px;
  left: 0;
  width: 100%;
  height: 30px;
  line-height: 30px;
  padding-left: 20px;
  font-size: 12px;
  color: hsla(0,0%,100%,.5);
  background: #333;
}

.singer-tag {
  width: 100%;
  height: 30px;
  margin-bottom: 20px;
  line-height: 30px;
  padding-left: 20px;
  font-size: 12px;
  color: hsla(0,0%,100%,.5);
  background: #333;
}

.singer-ul-li ul li {
  list-style-type: none;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 0 20px 20px;
  color: rgba(255, 255, 255, .5);
}

.singer-ul-li ul li img {
  border-radius: 50%;
  widows: 50px;
  height: 50px;
}

.singer-ul-li ul li div {
  padding-left: 20px;
}

.sort {
  position: fixed;
  z-index: 30;
  right: 0;
  top: 50%;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
  width: 20px;
  padding: 20px 0;
  border-radius: 10px;
  text-align: center;
  background: rgba(0,0,0,.3);
  font-family: Helvetica;
}

ul {
  margin: 0;
  padding: 0;
}

.sort ul{
  color: rgba(255,255,255,.6);
}

.sort ul li {
  list-style-type: none;
  padding: 3px;
  line-height: 1;
  font-size: 12px;
}

.current {
  color: #ffcd32;
}
</style>
