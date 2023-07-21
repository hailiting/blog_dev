# ReactNative 添加字体

## 获取字体

mac

- ⌘ + 空格键 搜索 `字体册 | Font Bool`
- 选择喜欢的字体 `Show In Finder`

## RN 项目配置

- 根目录创建 `assets/fonts`文件夹，并吧
- 根目录创建`react-native.config.js`

```js
// react-native.config.js
module.exports = {
  project: {
    ios: {},
    android: {},
  },
  assets: ["./assets/fonts/"],
};
```

## 执行 link

- RN 版本 0.69+ `npx react-native-asset`, 0.69+ 执行`npx react-native link`

### 对 Android 来说

将字体文件拷贝到`android/app/src/main/assets/fonts`目录下

### 对 ios 来讲

- 创建 Resources 文件，并将字体文件 link 到该文件夹下

```plist
<!-- Info.plist -->
<key>UIAppFonts</key>
<array>
  <string>DFWaWaSC-W5.otf</string>
</array>
```

## 在样式中使用

```js
const styles = StyleSheet.create({
  text: {
    ...
    fontFamily: "DFWaWaSC-W5"
  }
})
```
