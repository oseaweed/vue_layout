<template>
  <section class="preview" id="one">
    <!-- 预览视图 -->
    <div ref="preview" class="preview-area">
      <div v-if="!item.parentId" :id="item.info.id" v-for="(item,index) in components"></div>
    </div>
    <div @click="html()">点点点</div>
  </section>
</template>
<script>
import mount from "../components/mount";
// scoped style插件 ，解决webkit不支持scoped的问题
import scopedCss from "scopedcss";
export default {
  name: "preview",
  data() {
    return {};
  },
  mounted() {
    //读取云端数据
    let id = this.$route.params.id;
    let query = new this.$lean.Query("Share");
    if (id) {
      query.get(id).then(share => {
        let store = share.get("store");
        if (store) {
          _Vue.$store.commit("setState", store);
          //dom没有渲染完成 window._Vue为undefined，加个延迟
          setTimeout(() => {
            this.mount();
          }, 0);
        }
      });
    } else if (localStorage.store) {
      //读取本地数据
      let store = JSON.parse(localStorage.store);
      _Vue.$store.commit("setState", store);
      //dom没有渲染完成 window._Vue为undefined，加个延迟
      setTimeout(() => {
        this.mount();
      }, 0);
    }
  },
  computed: {
    components: {
      //组件树 ，预览视图中所有组件
      get() {
        return _Vue.$store.state.components;
      }
    },
    current: {
      //当前选中组件
      get() {
        return _Vue.$store.state.currentComponent;
      }
    }
  },
  methods: {
    mount() {
      //更新视图中组件的位置信息
      let components = JSON.parse(JSON.stringify(this.components));
      components
        .filter(component => !component.parentId)
        .forEach(component => {
          //预览模式 去掉选中边框
          component.template = component.template.replace(/ tabIndex="0"/g, "");
          mount(component.info.id, component);
          this.addUserStyle();
        });
    },
    addUserStyle() {
      if (!_Vue.$store.state.css) return;
      //添加用户编辑的css效果到预览视图
      let style = document.getElementById("custom-layout");
      if (!style) {
        style = document.createElement("style");
        style.id = "custom-layout";
        style.setAttribute("scoped", "");
        style.type = "text/css";
        this.$refs.preview.appendChild(style);
      }
      let cssText = document.createTextNode(_Vue.$store.state.css);
      style.innerHTML = "";
      style.appendChild(cssText);
      // 动态添加scoped style
      scopedCss.applyTo(this.$refs.preview);
    },
    html() {
      console.log(this.$el.outerHTML);
    }
  }
};
</script>
<style lang="less" scoped>
// @import '../components/list/muse-ui/src/styles/colors.less';

.preview {
  height: inherit;
  position: relative;
  overflow: hidden;
  width: 100%;
}

.preview-area {
  overflow: auto;
  position: relative;
  height: inherit;
  z-index: 0;
  width: inherit;
}
</style>

<style>
/*预览视图底部预留空间 方便操作   */
.preview-area > *:nth-last-child(1) {
  margin-bottom: 100px;
}
</style>
