import Vue from 'vue'
import preview from './one.vue'
import store from '../../store'
import router from '../../router/one'
//Muse-UI
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
// import '@/assets/css/theme-dark.css'
Vue.use(MuseUI)
//云数据库
import lean from '../../utils/leancloud storage'
Vue.prototype.$lean=lean
Vue.config.productionTip = false

/* eslint-disable no-new */
window._Vue = new Vue({
  el: '#one',
  store,
  router,
  template: '<One/>',
  components: { preview }
  // render: h => h(preview)
})