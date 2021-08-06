// 改变 生成的HTML上script标签的属性（module或noModule)
const pluginName = "htmlAfterPlugin";
const HtmlWebpackPlugin = require("html-webpack-plugin");
const assetsHelp = (data) => {
  let js = [];
  let css = [];
  const dir = {
    js: (item) => `<script class="lazyload-js" src="${item}"></script>`,
    css: (item) => `<link class="lazyload-css" rel="stylesheet" href="${item}"`,
  };
  for (let jsitem of data.js) {
    js.push(dir.js(jsitem));
  }
  for (let cssitem of data.css) {
    css.push(dir.css(cssitem));
  }
  return {
    js,
    css,
  };
};
class HtmlAfterPlugin {
  constructor() {
    this.jsArr = [];
  }
  // compiler：相当于webpack的核心，挂载了很多东西
  apply(compiler) {
    // compilation：每个chunk都会生成一个
    compiler.hooks.compilation.tap(pluginName, (compilation) => {
      // HtmlWebpackPlugin提供的钩子
      HtmlWebpackPlugin.getHooks(compilation).beforeAssetTagGeneration.tapAsync(
        "HtmlAfterPlugin", // <-- Set a meaningful name here for stacktraces
        (data, cb) => {
          // 获取需要替换的js
          const { js } = assetsHelp(data.assets);
          this.jsArr = js;

          // Tell webpack to move on
          cb(null, data);
        }
      );
      HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync(
        "HtmlAfterPlugin", // <-- Set a meaningful name here for stacktraces
        (data, cb) => {
          // 替换<!-- injectjs -->
          let _html = data.html;
          _html = _html.replace("<!-- injectjs -->", this.jsArr.join(""));
          // 替换@layouts和@components
          _html = _html.replace(/@layouts/g, "../../layouts");
          _html = _html.replace(/@components/g, "../../../components");

          data.html = _html;

          // Tell webpack to move on
          cb(null, data);
        }
      );
    });
  }
}

module.exports = HtmlAfterPlugin;
