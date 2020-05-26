import Vue from "vue";
// import preview from './one.vue'
import One from "./index.vue";

import store from "../../store";
import router from "../../router/one";
//Muse-UI
import MuseUI from "muse-ui";
import "muse-ui/dist/muse-ui.css";
// import '@/assets/css/theme-dark.css'
Vue.use(MuseUI);
//云数据库
import lean from "../../utils/leancloud storage";
import { createStore } from "../../store/index";

Vue.prototype.$lean = lean;
Vue.config.productionTip = false;

/* eslint-disable no-new */
// window._Vue = new Vue({
//   el: '#one',
//   store,
//   router,
//   template: '<One/>',
//   components: { One }
//   // render: h => h(preview)
// })
global._Vue = {
  $store: createStore(),
};
export function createApp() {
  const store = createStore();
  const app = new Vue({
    store,
    // 根实例简单的渲染应用程序组件。
    render: (h) => h(App),
  });
  return { app, store };
}
