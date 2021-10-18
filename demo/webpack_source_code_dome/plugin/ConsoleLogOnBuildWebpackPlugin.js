const pluginName = "ConsoleLogOnBuildWebpackPlugin";
class ConsoleLogOnBuildWebpackPlugin {
  // compiler -> webpack 预留 apply -> compiler.hooks.run ->return new AsyncSeriesHook(["compiler"])
  // typeable 事件通知的库 => AsyncSeriesHook
  // compiler.hooks.compilation.tap webpack进行编译了告诉我
  // HtmlWebpackPlugin.getHooks(compilation).beforeAssetTagGeneration.tapAsync
  // compiler.hooks.htmlWebpackPluginAfterHtmlProcessing.tap  htmp plugin定义的
  apply(compiler) {
    // tap 订阅注册  pluginName
    // compilation 每一次编译的所有的串
    compiler.hooks.run.tap(pluginName, (compilation) => {
      console.log("🍌 the webpack build process is starting");
    });
  }
}
module.exports = ConsoleLogOnBuildWebpackPlugin;
