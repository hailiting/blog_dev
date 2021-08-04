// 改变 生成的HTML上script标签的属性（module或noModule)
const pluginName = "htmlAfterPlugin";
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
class htmlAfterPlugin {
  apply(compiler) {
    compiler.hooks.compilation.tap(pluginName, (compilation) => {
      compilation.hooks.htmlWebpackPluginAfterHtmlProcessing.tap(
        pluginName,
        (htmlPluginData) => {
          console.log("xxxx", htmlPluginData.assets);
          let _html = htmlPluginData.html;
          _html = _html.replace(/@components/g, "../../../components");
          const result = assetsHelp(htmlPluginData.assets);
          console.log(result, "!@@@@");
          _html = _html.replace("<!--injectjs-->", result.js.join(""));
          _html = _html.replace("<!--injectcss-->", result.css.join(""));
          htmlPluginData.html = _html;
        }
      );
    });
  }
}
module.exports = htmlAfterPlugin;
