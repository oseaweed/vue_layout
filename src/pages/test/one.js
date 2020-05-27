import Vue from "vue";
// import preview from './one.vue'
import One from "./one.vue";
//Muse-UI
import MuseUI from "muse-ui";
import "muse-ui/dist/muse-ui.css";
// import '@/assets/css/theme-dark.css'
Vue.use(MuseUI);
//云数据库
import lean from "../../utils/leancloud storage";
import { createStore } from "../../store/index";
//iView-UI
import iView from "iview";
Vue.use(iView);

//Mint-UI
import { Toast, Indicator } from "mint-ui";
// import "mint-ui/lib/style.css";
Vue.prototype.$toast = Toast;
Vue.prototype.$indicator = Indicator;
import mint from "mint-ui";
Vue.use(mint);
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
global.$lean = lean;

global._Vue = {
  $store: createStore(),
};
export function createApp() {
  const store = createStore();

  const app = new Vue({
    store,
    // 根实例简单的渲染应用程序组件。
    render: (h) => h(One),
  });
  return { app, store };
}
