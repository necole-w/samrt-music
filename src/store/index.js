import { createStore } from 'vuex'

export default createStore({
  state: {
    minPlayerShow: true,
    playShow: false,
    singsongId: '',
    singImg: '',
    condition: false,
    isPlaying: true
  },
  getters: {
  },
  mutations: {
    // 是否播放音乐
    isPalying (state, toggle) {
      state.isPlaying = toggle
    },
    // mini播放器
    showMinPlayer (state, toggle) {
      state.minPlayerShow = toggle
    },
    // 大播放器显示
    showPlayer (state, params) {
      state.playShow = true
      state.singsongId = params.id
      state.singImg = params.img
    },
    // 隐藏大播放器
    hidePlayer (state) {
      state.playShow = false
    },
    // 判断是否需要获取歌词
    getlyricTure (state) {
      state.condition = true
    },
    getlyricFalse (state) {
      state.condition = false
    }
  },
  actions: {
  },
  modules: {
  }
})
