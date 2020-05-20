import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  // mode: "history",
  routes: [
    {
      path: "/one",
      name: "one",
      component: require("@/pages/test/index.vue"),
      // component: () => import("@/pages/test/one.vue"),

    },
    {
      path: " /preview/pc", //指定布局的正常pc浏览
      name: "preview_product",
      component: () => import("@/pages/test/one.vue"),
    },
    {
      path: "/preview/pc/:id", //指定布局的正常pc浏览
      component: () => import("@/pages/test/one.vue"),
    },
  ],
});
