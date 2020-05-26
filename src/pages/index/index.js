import Vue from "vue";
import App from "../../components/main.vue";
import router from "../../router/index.js";
import store from "../../store";

// import "../../assets/css/global.css";

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

//Muse-UI
import MuseUI from "muse-ui";
// import "muse-ui/dist/muse-ui.css";
// import '@/assets/css/theme-dark.css'
Vue.use(MuseUI);

//为代码文本提供高亮、缩进
import VueHighlightJS from "vue-highlightjs";
Vue.use(VueHighlightJS);
//为代码文本格式化
import pretty from "pretty";
Vue.prototype.$prettyDom = pretty;

//云数据库
import lean from "../../utils/leancloud storage";
Vue.prototype.$lean = lean;

Vue.config.productionTip = false;
Vue.prototype.$compile = Vue.compile;
import { createStore } from "../../store/index";

// window._Vue = new Vue({
//   el: "#app",
//   store,
//   router,
//   template: "<App/>",
//   components: { App },
// });
global._Vue = {
  $store: createStore(),
};
export function createApp(data) {
  const store = createStore();
  const app = new Vue({
    components: { App }, //演示如何从初始化地方传递数据给子组件。这个页面不使用vuex，展示简单粗暴的方式，配合global event bus即可https://vuejs.org/v2/guide/components.html#Non-Parent-Child-Communication
    template: '<App :appData="appData"/>',
    data: {
      //数据先在服务器渲染一遍，到了客户端会在重建一遍，如果客户端部分数据不一致，会重新渲染
      appData: data,
    },
    mounted: function () {
      console.log("mounted");
    },
    store,
  });
  return { app };
}
