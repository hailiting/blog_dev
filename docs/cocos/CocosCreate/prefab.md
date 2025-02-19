# prefab

预制体

- cc.assetManager
  - Bundle: 打成一个包
    - 内置 resources, internal, main, start-scene，自定义 Bundle 不能与之重名

## 2.x

```ts
const prefab = cc.loader.getRes("prefabs/myPrefab");
const instance = cc.instantiate(prefab);
this.node.addChild(instance);
```

###

```ts
type CustomFun = (cb: () => void) => {};
export default class Async {
  private constructor() {}
  // 递归
  static series(...oFunArray: CustomFun[]): void {
    if (null == oFunArray || oFunArray.length <= 0) {
      return;
    }
    const fun = () => {
      if (oFunArray.length <= 0) {
        return;
      }
      const funCurrent = oFunArray.shift();
      if (typeof funCurrent === "function") {
        funCurrent(fun);
      } else {
        fun();
      }
    };
    fun();
  }
}
```

```ts
import { Hero } from "./Hero";

/**
 * 英雄工厂
 */
export default class HeroFactory {
  private constructor() {}
  static create(hereName: string, callback: (oHero: Hero) => void) {
    if (null == hereName) {
      return;
    }
    let oLoadBundle = cc.assetManager.getBundle(BUNDLE_NAME);
    let oLoadedPrefab = null;
    Async.series(
      (funYesContinue) => {
        if (null !== oLoadBundle) {
          funYesContinue();
          return;
        }
        cc.assetManager.loadBundle(
          BUNDLE_NAME,
          (oError: Error, oBundle: cc.AssetManager.Bundle) => {
            if (null !== oError) {
              cc.error(oError);
              return;
            }
            oLoadBundle = oBundle;
            funYesContinue();
          }
        );
      },
      (funYesContinue) => {
        const oLoaderPrefab = oLoadBundle.get(hereName, cc.Prefab);
        if (null !== oLoaderPrefab) {
          funYesContinue();
          return;
        }
        oLoadBundle.load(hereName, (oError: Error, oPrefab: cc.Prefab) => {
          if (null !== oError) {
            cc.error(oError);
            return;
          }
          oLoadedPrefab = oPrefab;
          funYesContinue();
        });
      },
      (funYesContinue) => {
        if (null === oLoadedPrefab) {
          cc.error("预制体是空：" + hereName);
          return;
        }
        const oHeroNode = cc.instantiate(oLoadedPrefab);
      }
    );
  }
}
```

## 3.x

```ts
import { instantiate } from "cc";
const prefab = resource.get("prefabs/myPrefab");
const instance = instantiate(prefab);
this.node.addChild(instance);
```

```ts
import { AssetManager, assetManager, error, instantiate, Prefab } from "cc";
import { Hero } from "./Hero";

/**
 * 英雄工厂
 */
export default class HeroFactory {
  // 缓存已加载的预制体
  private static bundle: AssetManager.Bundle;
  private static heroPrefabs: Map<string, Prefab> = new Map();
  private constructor() {}
  static create(
    heroName: string,
    cb: (value: Hero | null) => void
  ): Promise<Hero | null> {
    return new Promise((resolve) => {
      let heroPrefab = this.heroPrefabs.get(heroName);
      if (heroPrefab) {
        this.createHeroFromPrefab(heroPrefab, cb, resolve);
        return;
      }
      if (this.bundle) {
        this.getPrefab(this.bundle, heroName, cb, resolve);
        return;
      }
      assetManager.loadBundle(
        "prefab",
        (oError: Error, oBundle: AssetManager.Bundle) => {
          if (null !== oError) {
            error(oError);
            return;
          }
          console.log({ oBundle });
          this.bundle = oBundle;
          this.getPrefab(this.bundle, heroName, cb, resolve);
        }
      );
    });
  }

  private static getPrefab(
    bundle: AssetManager.Bundle,
    heroName: string,
    cb: (value: Hero | null) => void,
    resolve?: (value: Hero | null) => void
  ) {
    bundle.load(heroName, Prefab, (err, prefab) => {
      if (err) {
        console.error("1111 Failed Create Hero: ", err);
        cb?.(null);
        resolve?.(null);
      }
      this.heroPrefabs.set(heroName, prefab);
      this.createHeroFromPrefab(prefab, cb, resolve);
    });
  }
  private static createHeroFromPrefab(
    prefab: Prefab,
    cb: (value: Hero | null) => void,
    resolve?: (value: Hero | null) => void
  ) {
    try {
      // 实例化预制体
      const heroNode = instantiate(prefab);
      // 获取Hero组件
      const heroComponent = heroNode.getComponent(Hero);
      if (!heroComponent) {
        console.error("Hero component not found on prefab");
        cb?.(null);
        resolve?.(null);
        return;
      }
      cb?.(heroComponent);
      resolve?.(heroComponent);
    } catch (err) {
      console.error("Failed Create Hero: ", err);
      cb?.(null);
      resolve?.(null);
    }
  }
  static release() {
    this.heroPrefabs.forEach((prefab, key) => {
      this.bundle.release(key);
    });
    this.heroPrefabs.clear();
  }
}
```
