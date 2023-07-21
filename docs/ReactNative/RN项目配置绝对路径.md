# RN 项目配置绝对路径

- 下载依赖

```sh
npm i babel-plugin-module-resolver --save-dev
# npm i babel-plugin-root-import --save-dev
```

- 配置`babel.config.js`

```js
module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: [
    // [
    //   "babel-plugin-root-import",
    //   {
    //     rootPathSuffix: "app",
    //   },
    // ],
    [
      "module-resolver",
      {
        alias: {
          "@": "./app",
          "@assets": "./assets",
        },
      },
    ],
  ],
};
```

- 配置`tsconfig.json`

```json
{
  "extends": "@tsconfig/react-native/tsconfig.json",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["app/*"],
      "@assets/*": ["assets/*"]
    }
  }
}
```

- 配置`metro.config.js`

```js
const { getDefaultConfig, mergeConfig } = require("@react-native/metro-config");
const path = require("path");
cconst config = {
  resolver: {
    alias: {
      '@': path.resolve(__dirname, './app'),
      '@assets': path.resolve(__dirname, './assets'),
    },
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
```

- 申明 png 类型

```ts
// declarations.d.ts
declare module "*.png" {
  import { ImageSourcePropType } from "react-native";
  const value: ImageSourcePropType;
  export default value;
}
```

- 使用

```tsx
import Logo from "@assets/images/ETH.png";

const ImageDemo = () => {
  return (
    <View>
      <Image source={Logo} />
      {/* <Image source={require('@assets/images/ETH.png')} /> */}
    </View>
  );
};
```
