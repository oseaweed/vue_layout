<template>
  <div id="one">
    <div>hh</div>
    <section class="preview">
      <!-- 预览视图 -->
      <div ref="preview" class="preview-area">
        <div v-if="!item.parentId" :id="item.info.id" v-for="(item,index) in components"></div>
      </div>
      <div @click="html()">点点点</div>
      <div v-for="id in ids">{{id}}</div>
    </section>
  </div>
</template>
<script>
import mount from "../../components/mount";
// scoped style插件 ，解决webkit不支持scoped的问题
import scopedCss from "scopedcss";
import lean from "../../utils/leancloud storage";

export default {
  name: "preview",
  data() {
    return {
      ids: [],
      components: [
        {
          template:
            '<mu-appbar data-component-active tabIndex="0" \n                    title="App Bar"\n>\n                    \n                </mu-appbar>',
          attributes: {
            title: { type: "text", value: "App Bar" },
            zDepth: { type: "slider", value: 0, max: 5, min: 0, step: 1 },
            titleClass: { type: "text", value: "" },
            class: { type: "text", value: "" }
          },
          slots: { left: [], right: [], default: [] },
          slot: "",
          info: { name: "App Bar", ui: "Muse-UI", id: "525d2d68-92b2" },
          position: {
            offsetLeft: 0,
            offsetRight: 611,
            offsetTop: 0,
            offsetBottom: 64
          }
        },
        {
          template:
            '<mu-float-button data-component-active tabIndex="0" \n                        icon="add"\n>\n                        \n                    </mu-float-button>',
          attributes: {
            icon: { type: "icon", value: "add" },
            disabled: { type: "boolean", value: false },
            type: {
              type: "selection",
              value: "",
              items: ["submit", "button", "reset"]
            },
            href: { type: "text", value: "" },
            target: {
              type: "selection",
              value: "",
              items: ["_blank", "self", "_parent", "_top"]
            },
            tag: { type: "text", value: "" },
            exact: { type: "boolean", value: false },
            secondary: { type: "boolean", value: false },
            mini: { type: "booleam", value: false },
            backgroundColor: { type: "color", value: "" },
            class: { type: "text", value: "" }
          },
          slots: { default: [] },
          slot: "",
          info: {
            name: "Floating Action Button",
            ui: "Muse-UI",
            id: "1c3beafb-8127"
          }
        }
      ]
    };
  },
  async asyncData() {
    return new Promise(resolve => {
      //读取云端数据
      let id = "5ecdbb7a16b74900086ccfa9";
      // let query = new lean.Query("Share");
      const self = this;
      if (id) {
        _Vue.$store.dispatch("getLeanData", id).then(() => {
          this.components = _Vue.$store.state.components;
          console.log("hhhhhh", this.components);
          self.mount();
          resolve();
        });

        // query.get(id).then(share => {
        //   resolve();
        //   this.ids.push(22);
        //   console.log(2211);
        //   let store = share.get("store");
        //   if (store) {
        //     _Vue.$store.commit("setState", store);
        //     //dom没有渲染完成 window._Vue为undefined，加个延迟
        //     // setTimeout(() => {
        //     this.mount();
        //     // }, 0);
        //   }
        // });
      } else if (localStorage.store) {
        //读取本地数据
        let store = JSON.parse(localStorage.store);
        _Vue.$store.commit("setState", store);
        //dom没有渲染完成 window._Vue为undefined，加个延迟
        setTimeout(() => {
          this.mount();
        }, 0);
      }
    });
  },
  computed: {
    // components: {
    //   //组件树 ，预览视图中所有组件
    //   get() {
    //     return _Vue.$store.state.components;
    //   }
    // },

    current: {
      //当前选中组件
      get() {
        return _Vue.$store.state.currentComponent;
      }
    }
  },
  // methods: {
  mount() {
    this.components = _Vue.$store.state.components;
    console.log(this.components);
    //更新视图中组件的位置信息
    let components = JSON.parse(JSON.stringify(this.components));
    components
      .filter(component => !component.parentId)
      .forEach(component => {
        //预览模式 去掉选中边框
        component.template = component.template.replace(/ tabIndex="0"/g, "");
        mount(component.info.id, component);
        // this.addUserStyle();
      });
  },
  addUserStyle() {
    // if (!_Vue.$store.state.css) return;
    // //添加用户编辑的css效果到预览视图
    // let style = document.getElementById("custom-layout");
    // if (!style) {
    //   style = document.createElement("style");
    //   style.id = "custom-layout";
    //   style.setAttribute("scoped", "");
    //   style.type = "text/css";
    //   this.$refs.preview.appendChild(style);
    // }
    // let cssText = document.createTextNode(_Vue.$store.state.css);
    // style.innerHTML = "";
    // style.appendChild(cssText);
    // // 动态添加scoped style
    // scopedCss.applyTo(this.$refs.preview);
  },
  html() {
    console.log(this.$el.outerHTML);
    fetch("http://localhost:8080/one.html#/").then(res => console.log(res));
  }
};
// };
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
