/**
 * 本文件非vue官方指定必须的文件，是kenko额外抽取的一些页面配置，同时做多页面express路由和直出配置
 */
module.exports = {
  page1: {
    url: "/page1.html", //访问的url规则，用于express的get
    dir: "./src/pages/index", //页面目录，默认有app.js作为入口
    title: "Page1", //生成html的title
    template: "./src/pages/index/tpl.html", //特殊指定一个html
  },
  page2: {
    url: "/page2.html", //访问的url规则，用于express的get
    dir: "./src/pages/index", //页面目录，默认有app.js作为入口
    title: "Page2", //生成html的title
  },
};
