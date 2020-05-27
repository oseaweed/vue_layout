import Vue from "vue";
import Vuex from "vuex";
import lean from "../utils/leancloud storage";

import {
  getTemplate,
  getSlotContent,
  getStringTypeAttr,
} from "@/components/template";
// 深度合并
import mergeDeep from "@/utils/mergeDeep";
import { getData } from "page2Data";
Vue.use(Vuex);
export function createStore() {
  return new Vuex.Store({
    state: {
      width: [
        {
          attr: "15",
          preview: "70",
          components: "15",
        },
        {
          attr: "20",
          preview: "60",
          components: "20",
        },
        {
          attr: "25",
          preview: "50",
          components: "25",
        },
      ],
      css: "", //用户编辑的自定义css字符串
      activeUI: "Muse-UI",
      currentComponent: {}, //预览视图的选中组件
      components: [], //预览视图的组件树
      backupComponents: [], //删除组件时备份的
      copiedComponents: [], //复制的组件
      msg: "default",
    },
    mutations: {
      setState(state, obj) {
        // obj = mergeDeep(JSON.parse(JSON.stringify(state)), obj)
        Object.assign(state, obj);

        //保存本地
        localStorage.store = JSON.stringify(state);
      },
      setMsg(state, msg) {
        state.msg = msg;
      },
      setCom(state, component) {
        console.log(321, component);
        state.components = component;
      },
    },
    actions: {
      delComponent(context, id) {
        //删除前备份一份
        context.commit("setState", {
          backupComponents: JSON.parse(
            JSON.stringify(context.state.components)
          ),
        });

        let components = context.state.components;
        let index = components.findIndex((c) => c.info.id === id);
        let component = components[index];
        //从父组件的slots中删除
        if (component.parentId) {
          let parent = components.find((c) => c.info.id === component.parentId);
          let slot =
            parent.slots[
              component.slot || component.attributes.slot || "default"
            ];
          let i = slot.findIndex((item) => item.id === component.info.id);
          //删除
          slot.splice(i, 1);

          //递归获取最父级组件
          let getTop = function (_component) {
            if (_component.parentId) {
              let c = components.find((c) => c.info.id === _component.parentId);
              return getTop(c);
            } else {
              return _component;
            }
          };

          //更新模板
          let top = getTop(parent);
          top.template = getTemplate(
            top.info,
            top.attributes,
            top.slots
          ).template;
        }
        //删除当前组件所有子组件
        function delChildren(component) {
          let slots = component.slots;
          Object.keys(slots).forEach((slot) => {
            if (component.slots[slot].length) {
              component.slots[slot].forEach((val) => {
                let childIndex = components.findIndex(
                  (c) => c.info.id === val.id
                );
                let hasChild;
                if (childIndex >= 0)
                  hasChild = Object.keys(components[childIndex].slots).every(
                    (slot) => {
                      return components[childIndex].slots[slot].length > 0;
                    }
                  );
                if (hasChild) delChildren(components[childIndex]);
                components.splice(childIndex, 1);
              });
            }
          });
        }
        delChildren(component);

        //删除自身
        index = components.findIndex((c) => c.info.id === id); //components已被更新 重新获取索引
        components.splice(index, 1);

        //更新
        context.commit("setState", { currentComponent: {}, components });

        return Promise.resolve(components);
      },
      //vue文件中调用getData时，传入id。commit是vuex内部方法
      getData({ commit }, id) {
        return getData(id).then((data) => {
          commit("setMsg", data.msg); //调用mutations的方法
        });
      },
      setData({ commit }, msg) {
        commit("setMsg", msg); //调用mutations的方法
      },

      getLeanData({ commit }, id) {
        console.log(123123);
        const aa = [
          {
            template:
              '<mu-appbar data-component-active tabIndex="0" \n                    title="App Bar"\n>\n                    \n                </mu-appbar>',
            attributes: {
              title: { type: "text", value: "App Bar" },
              zDepth: { type: "slider", value: 0, max: 5, min: 0, step: 1 },
              titleClass: { type: "text", value: "" },
              class: { type: "text", value: "" },
            },
            slots: { left: [], right: [], default: [] },
            slot: "",
            info: { name: "App Bar", ui: "Muse-UI", id: "525d2d68-92b2" },
            position: {
              offsetLeft: 0,
              offsetRight: 611,
              offsetTop: 0,
              offsetBottom: 64,
            },
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
                items: ["submit", "button", "reset"],
              },
              href: { type: "text", value: "" },
              target: {
                type: "selection",
                value: "",
                items: ["_blank", "self", "_parent", "_top"],
              },
              tag: { type: "text", value: "" },
              exact: { type: "boolean", value: false },
              secondary: { type: "boolean", value: false },
              mini: { type: "booleam", value: false },
              backgroundColor: { type: "color", value: "" },
              class: { type: "text", value: "" },
            },
            slots: { default: [] },
            slot: "",
            info: {
              name: "Floating Action Button",
              ui: "Muse-UI",
              id: "1c3beafb-8127",
            },
          },
        ];
        console.log(111);
        commit("setCom", aa);
      },
    },
    //mutations做所有数据的修改
  });
}
