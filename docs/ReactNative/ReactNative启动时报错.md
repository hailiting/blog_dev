# ReactNative 启动时报错

## Unable to load script

=> 缺少 `index.android.bundle`文件

- cd 到项目，执行命令

`react-native bundle --platform android --dev false --entry-file index.android.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res`

如执行此次命令报错，则 copy 一份项目最外层的 index.js 出来，改名叫 index.android.js，再执行此命令（因 index.android.js 不存在）

此时在刚才建的 assets 文件中会有一个 index.android.bundle 文件（本人的项目中看不到，但是确实存在，在 assets 里新建一个 index.android.bundl 提示重复）
